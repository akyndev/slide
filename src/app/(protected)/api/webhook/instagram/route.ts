import { findAutomation } from "@/actions/automations/queries"
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  getKeywordPost,
  matchKeyword,
  trackResponses
} from "@/actions/webhook/queries"
import { db } from "@/db"
import { sendDM, sendPrivateMessage } from "@/lib/fetch"
import { openai } from "@/lib/openai"
import { NextRequest, NextResponse } from "next/server"



export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge")
  return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
  console.log("WEBHOOK STARTING...")
  const webhook_payload = await req.json()
  if (webhook_payload) {
    console.log("WEBHOOK PAYLOAD", webhook_payload)
    const changes = webhook_payload.entry[0].changes
    const webhook_id = webhook_payload.entry[0].id
    const changes_id = changes[0].value.id
    const changes_text = changes[0].value.text

    let matcher

    try {
      if (webhook_payload.entry[0].messaging)
        matcher = await matchKeyword(webhook_payload.entry[0].messaging[0].message.text)

      if (changes) matcher = await matchKeyword(changes_text)

      if (matcher && matcher.automationId) {
        console.log("Matched", matcher)
        // We have a keyword matcher

        if (webhook_payload.entry[0].messaging) {
          const automation = await getKeywordAutomation(matcher.automationId, true)

          if (automation && automation.triggers) {
            if (automation.listener && automation.listener.listener === "message") {
              const direct_message = await sendDM(
                webhook_id,
                webhook_payload.entry[0].messaging[0].sender.id,
                automation.listener?.prompt!,
                automation.user?.integrations[0].token!
              )
              console.log("DIRECT HARDCODED MESSAGE SENT...")

              if (direct_message.status === 200) {
                console.log("TRACKING RESPONSES...")
                const tracked = await trackResponses(automation.id, "dm")
                if (tracked) {
                  return NextResponse.json(
                    {
                      message: "Message sent"
                    },
                    { status: 200 }
                  )
                }
              }
            }

            if (
              automation.listener &&
              automation.listener.listener === "smart_ai" &&
              automation.user?.subscription?.plan === "pro"
            ) {
              const smart_ai_message = await openai.chat.completions.create({
                model: "grok-2-1212",
                messages: [
                  {
                    role: "assistant",
                    content: `${automation.listener?.prompt}: Keep responses under 2 sentences`
                  }
                ]
              })

              if (smart_ai_message.choices[0].message.content) {
                await db.transaction(async () => {
                  await createChatHistory(
                    automation.id,
                    webhook_id,
                    webhook_payload.entry[0].messaging[0].sender.id,
                    webhook_payload.entry[0].messaging[0].message.text
                  );
                    await createChatHistory(
                      automation.id,
                      webhook_id,
                      webhook_payload.entry[0].messaging[0].sender.id,
                      smart_ai_message.choices[0].message.content!
                    )
                })

                const direct_message = await sendDM(
                  webhook_id,
                  webhook_payload.entry[0].messaging[0].sender.id,
                  smart_ai_message.choices[0].message.content,
                  automation.user?.integrations[0].token!
                )

                if (direct_message.status === 200) {
                  console.log("TRACKING RESPONSES...")
                  const tracked = await trackResponses(automation.id, "dm")
                  if (tracked) {
                    return NextResponse.json(
                      {
                        message: "Message sent"
                      },
                      { status: 200 }
                    )
                  }
                }
              }
            }
          }
        }

        if (changes && changes[0].field === "comments") {
          const automation = await getKeywordAutomation(matcher.automationId, false)
          console.log("getting the automations", automation)

          const automations_post = await getKeywordPost(changes[0].value.media.id, automation?.id!)
          console.log("found keyword ", automations_post)

          if (automation && automations_post && automation.triggers) {
            if (automation.listener) {
              console.log("WE HAVE A LISTENER OF TYPE:", automation.listener.listener)

              if (automation.listener.listener === "message") {
                console.log("SENDING DM, WEB HOOK PAYLOAD", webhook_payload, "changes", changes[0].value.from)

                console.log("COMMENT VERSION:", changes[0].value.from.id)

                const direct_message = await sendPrivateMessage(
                  webhook_id,
                  changes_id,
                  automation.listener?.prompt!,
                  automation.user?.integrations[0].token!
                )

                console.log("DM SENT", direct_message.data)

                if (direct_message.status === 200) {
                  console.log("TRACKING RESPONSES FOR COMMENT...")
                  const tracked = await trackResponses(automation.id, "comment")

                  if (tracked) {
                    return NextResponse.json(
                      {
                        message: "Message sent"
                      },
                      { status: 200 }
                    )
                  }
                }
              }

              if (automation.listener.listener === "smart_ai" && automation.user?.subscription?.plan === "pro") {
                console.log("PROMPTING GROK....")
                const smart_ai_message = await openai.chat.completions.create({
                  model: "grok-2-1212",
                  messages: [
                    {
                      role: "assistant",
                      content: `${automation.listener?.prompt}: keep responses under 2 sentences`
                    }
                  ]
                })
                console.log("DONE PROMPTING...", smart_ai_message.choices[0].message)
                console.log("DONE PROMPTING...", smart_ai_message.choices[0].message.content)

                if (smart_ai_message.choices[0].message.content) {
                  console.log("CREATING TRANSACTION...")
                  await db.transaction(async () => {
                    await createChatHistory(
                      automation.id,
                      webhook_id,
                      webhook_payload.entry[0].messaging[0].sender.id,
                      webhook_payload.entry[0].messaging[0].message.text
                    );
                      await createChatHistory(
                        automation.id,
                        webhook_id,
                        webhook_payload.entry[0].messaging[0].sender.id,
                        smart_ai_message.choices[0].message.content!
                      )
                  })

                  const direct_message = await sendPrivateMessage(
                    webhook_id,
                    changes_id,
                    automation.listener?.prompt!,
                    automation.user?.integrations[0].token!
                  )
                  console.log("PRIVATE MESSAGE SENT!!!", direct_message)

                  if (direct_message.status === 200) {
                    console.log("TRACKING RESPONSES...")
                    const tracked = await trackResponses(automation.id, "comment")

                    if (tracked) {
                      return NextResponse.json(
                        {
                          message: "Message sent"
                        },
                        { status: 200 }
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (!matcher) {
        console.log("GETTING CHAT HISTORY...")
        const customer_history = await getChatHistory(
          webhook_payload.entry[0].messaging[0].recipient.id,
          webhook_payload.entry[0].messaging[0].sender.id
        )
        console.log("DONE GETTING CHAT HISTORY!!!")

        if (customer_history.history.length > 0) {
          const automation = await findAutomation(customer_history.automationId!)

          if (automation?.user?.subscription?.plan === "pro" && automation.listener?.listener === "smart_ai") {
            console.log("PROMPTING GROK IN A NO MATCHER....")
            const smart_ai_message = await openai.chat.completions.create({
              model: "grok-2-1212",
              messages: [
                {
                  role: "assistant",
                  content: `${automation.listener?.prompt}: keep responses under 2 sentences`
                },
                ...customer_history.history,
                {
                  role: "user",
                  content: webhook_payload.entry[0].messaging[0].message.text
                }
              ]
            })
            console.log("DONE PROMPTING...", smart_ai_message)

            if (smart_ai_message.choices[0].message.content) {
              await db.transaction(async () => {
                await createChatHistory(
                  automation.id,
                  webhook_id,
                  webhook_payload.entry[0].messaging[0].sender.id,
                  webhook_payload.entry[0].messaging[0].message.text
                );
                  await createChatHistory(
                    automation.id,
                    webhook_id,
                    webhook_payload.entry[0].messaging[0].sender.id,
                    smart_ai_message.choices[0].message.content!
                  )
              })

              const direct_message = await sendDM(
                webhook_id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
                automation.user?.integrations[0].token!
              )
              console.log("DIRECT MESSAGE SENT!!!", direct_message)

              if (direct_message.status === 200) {
                //if successfully send we return

                return NextResponse.json(
                  {
                    message: "Message sent"
                  },
                  { status: 200 }
                )
              }
            }
          }
        }

        return NextResponse.json(
          {
            message: "No automation set"
          },
          { status: 200 }
        )
      }

      return NextResponse.json(
        {
          message: "No automation set"
        },
        { status: 200 }
      )
    } catch (error) {
      return NextResponse.json(
        {
          message: "No automation set"
        },
        { status: 200 }
      )
    }
  }
  return NextResponse.json(
    {
      message: "No webhook payload"
    },
    { status: 200 }
  )
}
