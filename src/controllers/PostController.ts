import prisma from "../../prisma/client";

export async function getPosts(){
    try {
        const posts = await prisma.post.findMany({orderBy:{id:'desc'}});
        return {
            success: true,
            message: 'Posts fetched successfully',
            data: posts,
        };
    }catch (e: unknown){
        return {
            success: false,
            message: 'Failed to fetch posts',
            error: e as Error,
        };
    }
}

export async function getPostById(id: string){
try {
        const postId = parseInt(id);
        const post = await prisma.post.findUnique({where: {id: postId}});
        if (!post) {
            return {
                success: false,
                message: 'Post not found',
            };
        }
        return {
            success: true,
            message: 'Post fetched successfully',
            data: post,
        };
    }catch (e: unknown){
        return {
            success: false,
            message: 'Failed to fetch post',
            error: e as Error,
        };
    }
}

export async function createPost(options: {title: string, content: string}) {
    try {
        const {title, content} = options;
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
            },
        });
        return {
            success: true,
            message: 'Post created successfully',
            data: post,
        };
    } catch (e: unknown) {
        return {
            success: false,
            message: 'Failed to create post',
            error: e as Error,
        }
    }
}

export async function updatePost(id: string, options: {title: string, content: string}) {
    try {
        const postId = parseInt(id);
        const {title, content} = options;
        const post = await prisma.post.update({
            where: {id: postId},
            data: {
                title: title,
                content: content,
            },
        });
        return {
            success: true,
            message: 'Post updated successfully',
            data: post,
        };
    } catch (e: unknown) {
        return {
            success: false,
            message: 'Failed to update post',
            error: e as Error,
        }
    }
}

export async function deletePost(id: string) {
    try {
        const postId = parseInt(id);
        await prisma.post.delete({where: {id: postId}});
        return {
            success: true,
            message: 'Post deleted successfully',
        };
    } catch (e: unknown) {
        return {
            success: false,
            message: 'Failed to delete post',
            error: e as Error,
        }
    }
}