'use client';

import { useRouter } from 'next/navigation';

const DeleteButton = ({ id }: { id: string }) => {
    const router = useRouter()

    const action = async () => {
        const response = await fetch('/api/deleteEmail', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id": id })
        })
        console.log(response)
        if (response == undefined) {
            alert("There was an issue deleing the email");
        } else if (response.status == 200) {
            router.back()
            router.refresh()
        } else {
            alert("There was an issue deleing the email");
        }
    }

    return <div className="">
        <button onClick={() => {
            if (confirm("Are you sure you want to delete this email? This cannot be undone.")) {
                action()
            } else {
                console.log("User cancelled delete")
            }
        }}><p className="bg-red-400 px-4 py-2 text-white rounded-md md:hover:opacity-50 transition-all">Delete</p></button>
    </div>
}

export default DeleteButton