import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/utils/api";

export default function Messages() {
  const { isFetching, data: messages } = api.contact.getAll.useQuery()

  const isEmpty = messages && messages.length === 0

  return (
    <Layout title="Mensagens">
      <div className="w-[90%] max-w-5xl mx-auto space-y-4 mt-8">
        <h2 className="font-bold text-3xl">
          Mensagens
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mensagem</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching &&
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              </TableRow>
            }
            {!isFetching && messages && !isEmpty &&
              messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    {message.sender}
                  </TableCell>
                  <TableCell>
                    {message.email}
                  </TableCell>
                  <TableCell>
                    {message.message}
                  </TableCell>
                </TableRow>
              ))
            }
            {!isFetching && isEmpty &&
              <TableRow>
                <TableCell className="font-medium text-neutral-300">Lista vazia.</TableCell>
              </TableRow>
            }

          </TableBody>
        </Table>
      </div>
    </Layout >
  )
}
