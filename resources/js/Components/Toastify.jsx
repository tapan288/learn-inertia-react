import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function Toastify() {
    const page = usePage();

    useEffect(() => {
        if (page?.props?.message) {
            toast(page.props.message.body, {
                position: "top-right",
                type: page.props.message.type,
            });
        }
    }, [page.props.message]);

    return (
        <>
            <Toaster />
        </>
    );
}
