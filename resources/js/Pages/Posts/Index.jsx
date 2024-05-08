import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth,posts }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
        >
            <Head title="Posts">
                <meta name="description" content="Posts Index" />
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {posts.data.map((post) => {
                            return (
                                <div key={post.id}>
                                <div className="font-semibold">
                            {post.user.name}
                        </div>
                        <p className="mt-1">{post.body}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
