import { type SyntheticEvent, useRef } from "react";
import { z } from "zod";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "./spinner";

const messageSchema = z.object({
  sender: z.string().min(1).max(25),
  email: z.string().min(1).max(50).email(),
  message: z.string().min(1).max(250),
})

export function ContactForm() {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const { mutate, isPending } = api.contact.create.useMutation();

  function onMessageSend(e: SyntheticEvent) {
    e.preventDefault()

    // faz a validação dos valores dos campos sem throw de erro
    const res = messageSchema.safeParse({
      sender: nameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      message: messageRef.current?.value ?? "",
    })

    if (res.success) {
      mutate({
        sender: res.data.sender,
        email: res.data.email,
        message: res.data.message,
      })
      toast.success("mensagem enviada")
    } else {
      toast.error("erro")
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-4 items-center mx-auto"
      onSubmit={onMessageSend}
    >
      <Input placeholder="Nome" ref={nameRef} />
      <Input placeholder="Email" ref={emailRef} />
      <Textarea placeholder="Mensagem" ref={messageRef} />
      <Button
        type="submit"
        className="w-32 bg-indigo-400"
        disabled={isPending}
      >
        {isPending && <span className="text-black"><Spinner /></span>}
        {!isPending && "Enviar"}
      </Button>
    </form>
  )
}
