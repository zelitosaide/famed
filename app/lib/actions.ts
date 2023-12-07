"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { updateNews } from "./web/data";
 
// const InvoiceSchema = z.object({
//   id: z.string(),
//   customerId: z.string(),
//   amount: z.coerce.number(),
//   status: z.enum(["pending", "paid"]),
//   date: z.string(),
// });

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
  // title: z.string(),
});
 
const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
    title?: string[];
    description?: string[];
    // image?: string[];
    content?: string[];
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
 
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

// export async function updateInvoice(id: string, formData: FormData) {
//   const { customerId, amount, status } = UpdateInvoice.parse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//   });
 
//   const amountInCents = amount * 100;
 
//   try {
//     await sql`
//         UPDATE invoices
//         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//         WHERE id = ${id}
//       `;
//   } catch (error) {
//     return { message: "Database Error: Failed to Update Invoice." };
//   }
 
//   revalidatePath("/dashboard/invoices");
//   redirect("/dashboard/invoices");
// }
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData | any,
) {
  // const data = new FormData();
  // console.log(formData.get("title"));
  // console.log(formData.get("description"));
  // console.log(formData.get("department"));
  // console.log(formData.get("image"));
  // console.log(formData);


  // data.set("title", formData.get("title"))
  // console.log(formData.get("imagem")?.size);
  // console.log(formData.get("content"));
  // const validatedFields = UpdateInvoice.safeParse({
  //   customerId: formData.get("customerId"),
  //   amount: formData.get("amount"),
  //   status: formData.get("status"),
  // });
 
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: "Missing Fields. Failed to Update Invoice.",
  //   };
  // }
 
  // const { customerId, amount, status } = validatedFields.data;
  // const amountInCents = amount * 100;
 
  try {
    // await sql`
    //   UPDATE invoices
    //   SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    //   WHERE id = ${id}
    // `;
    // console.log(formData.get("image").size);

    if (formData.get("image").size === 0) {
      formData.delete("image");
    }

    // console.log(formData);

    // const data = new FormData();
    // console.log(formData.get("title"));
    // console.log(formData.get("description"));
    // console.log(formData.get("department"));
    // console.log(formData.get("image"));
    // console.log(formData.delete("image"));

    // const news = await updateNews(id, formData);
    await updateNews(id, formData);
    // console.log("Ollallalla");
    // console.log(news);
  } catch (error) {
    // console.log(error);
    return { message: "Database Error: Failed to Update Invoice." };
  }
 
  revalidatePath("/dashboard/invoices/news");
  redirect("/dashboard/invoices/news");
}

export async function deleteInvoice(id: string) {
  // throw new Error("Failed to Delete Invoice");
  
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}