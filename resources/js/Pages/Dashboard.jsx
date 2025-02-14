import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function Dashboard({ auth, datetime }) {
    const reload = (delay = 0) => {
        router.reload({
            only: ["datetime"],
            data: { delay },
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">{datetime}</div>
                        {/* <PrimaryButton
                            className="m-4"
                            onClick={() =>
                                router.post(
                                    "notification",
                                    {},
                                    {
                                        only: ["notifications"],
                                    }
                                )
                            }
                        >
                            Add Notification
                        </PrimaryButton> */}

                        <PrimaryButton onClick={() => reload(0)}>
                            Normal Request
                        </PrimaryButton>
                        <PrimaryButton onClick={() => reload(5)}>
                            Reload in 5 second{" "}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
