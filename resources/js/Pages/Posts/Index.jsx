import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Head,
    useForm,
    router,
    usePage,
    usePoll,
    Deferred,
} from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index({
    auth,
    posts,
    postsCount,
    morePosts,
    evenMorePosts,
}) {
    const [isPolling, setIsPolling] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { start, stop } = usePoll(
        5000,
        {
            only: ["postsCount"],
            onStart: () => setIsRefreshing(true),
            onSuccess: () => {
                setIsRefreshing(false);
            },
        },
        {
            autoStart: isPolling,
            keepAlive: false,
        }
    );

    useEffect(() => {
        isPolling ? start() : stop();
    }, [isPolling]);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm("StorePost", {
            body: "",
        });

    const page = usePage();

    function submit(e) {
        e.preventDefault();
        post(route("posts.store"), {
            onSuccess: () => {
                reset("body");
            },
        });
    }

    function refreshPosts() {
        router.visit(route("posts.index"), {
            only: ["posts"],
            preserveScroll: true,
            preserveState: true,
        });
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Posts ({postsCount})
                    {!isPolling && (
                        <DangerButton
                            onClick={() => setIsPolling(true)}
                            className="mx-2"
                        >
                            Enable Polling
                        </DangerButton>
                    )}
                    {isPolling && (
                        <PrimaryButton
                            onClick={() => setIsPolling(false)}
                            className="mx-2"
                        >
                            Disable Polling
                        </PrimaryButton>
                    )}
                    {isRefreshing && (
                        <span className="ml-2">Refreshing...</span>
                    )}
                </h2>
            }
        >
            <Head title="Posts">
                <meta name="description" content="Posts Index" />
            </Head>

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    {page.props.can.post_create && (
                        <form
                            onSubmit={submit}
                            className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6"
                        >
                            <label htmlFor="body" className="sr-only">
                                Body
                            </label>
                            <textarea
                                onChange={(e) =>
                                    setData("body", e.target.value)
                                }
                                onFocus={() => clearErrors("body")}
                                name="body"
                                id="body"
                                cols="30"
                                rows="5"
                                value={data.body}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                            ></textarea>
                            {errors.body && (
                                <p className="text-red-500">{errors.body}</p>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className={`mt-2 bg-gray-700 px-4 py-2 rounded-md font-medium text-white ${
                                    processing && "opacity-50"
                                }`}
                            >
                                Post
                            </button>
                        </form>
                    )}
                    <div className="py-3 flex justify-center">
                        {/* <Link
                    href={route('posts.index')}
                    only={['posts']}
                    preserveScroll
                        className="text-sm text-indigo-700"
                        type="button"
                    >
                        Refresh posts
                    </Link> */}
                        <button
                            onClick={refreshPosts}
                            className="text-sm text-indigo-700"
                            type="button"
                        >
                            Refresh posts
                        </button>
                    </div>
                    <Deferred data="posts" fallback={<div>Loading...</div>}>
                        {posts &&
                            posts.data.map((post) => {
                                return (
                                    <div
                                        key={post.id}
                                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                                    >
                                        <div className="p-6 text-gray-900">
                                            <div className="font-semibold">
                                                {post.user.name}
                                            </div>
                                            <p className="mt-1">{post.body}</p>
                                        </div>
                                    </div>
                                );
                            })}
                    </Deferred>

                    <Deferred
                        data={["morePosts", "evenMorePosts"]}
                        fallback={<div>Loading...</div>}
                    >
                        {morePosts && <div>More Posts data loaded</div>}
                        {evenMorePosts && (
                            <div>Even More Posts data loaded</div>
                        )}
                    </Deferred>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
