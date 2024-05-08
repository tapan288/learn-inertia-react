import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,useForm } from '@inertiajs/react';

export default function Dashboard({ auth,posts }) {
    const { data, setData, post, processing, errors } = useForm({
        body: '',
      })

      function submit(e) {
          e.preventDefault()
          post(route('posts.store'))
        }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
        >
            <Head title="Posts">
                <meta name="description" content="Posts Index" />
            </Head>

            <div className="py-12">
                {/* { data.body } */}
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-3">
                <form onSubmit={submit}
                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6"
                >
                    <label for="body" className="sr-only">Body</label>
                    <textarea
                    onChange={e => setData('body', e.target.value)}
                        name="body"
                        id="body"
                        cols="30"
                        rows="5"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                    ></textarea>
                    <button
                        type="submit"
                        className="mt-2 bg-gray-700 px-4 py-2 rounded-md font-medium text-white"
                    >
                        Post
                    </button>
                </form>
                        {posts.data.map((post) => {
                            return (
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                            <div className="font-semibold">
                                {post.user.name}
                            </div>
                            <p className="mt-1">{post.body}</p>
                        </div>
                    </div>
                            )
                        })}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
