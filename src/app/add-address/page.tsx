// app/add-address/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function AddAddressPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📍 Add New Address</h1>
      <div className="border p-4 rounded-md shadow-md">
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Address Line" className="w-full border p-2 rounded" />
          <input type="text" placeholder="City" className="w-full border p-2 rounded" />
          <input type="text" placeholder="ZIP Code" className="w-full border p-2 rounded" />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">Save Address</button>
        </form>
      </div>
    </main>
  );
}
