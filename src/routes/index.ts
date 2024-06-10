import {Elysia, t} from "elysia";

import {getPosts, createPost, getPostById, updatePost} from "../controllers/PostController";

const Routes = new Elysia({prefix: '/posts'})
    .get('/', ()=> getPosts())
    .post('/', ({body})=> createPost(body as {title: string, content: string}),{
        body: t.Object({
            title: t.String({
              minLength: 3,
              maxLength: 100,
            }),
            content: t.String({
              minLength: 3,
              maxLength: 1000,
            }),
          })
        })
    .get('/:id', ({params: { id }}) => getPostById(id))
    .patch('/:id', ({params: { id }, body}) => updatePost(id, body as {title: string, content: string}),{
        body: t.Object({
            title: t.String({
              minLength: 3,
              maxLength: 100,
            }),
            content: t.String({
              minLength: 3,
              maxLength: 1000,
            }),
          })
        })
    .delete('/:id', ({params: { id }}) => `Delete post with id ${id}`);

export default Routes;