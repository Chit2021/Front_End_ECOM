//userServer file
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import usersData from '../data/usersData'
import { NewUser } from '../../types/NewUser'
import User from '../../types/User'
import { UserUpdate } from '../../types/UserUpdate'
import { jwtFixture } from '../../components/JwtFixture'

export const access_token = "my-access-token"

export const handlers = [
     /* rest.get('/api/user', (req, res, ctx) => {
        return res(ctx.json('John Smith'), ctx.delay(150))
    }) */ // reference code
    rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
        return res(ctx.json(usersData))
    }),
    // rest.post('https://api.escuelajs.co/api/v1/auth/login', async (req, res, ctx) => {
    //     const { email, password } = await req.json()
    //     console.log(email, password)
    //     const foundUser = usersData.find(u => u.email === email && u.password === password)
    //     if (foundUser) {
    //         const token = access_token + '_' + foundUser.id
    //         return res(ctx.json({ access_token: token }))
    //     }
    //     else {
    //         ctx.status(401)
    //         return res(ctx.text("Cannot authenticate user"))
    //     }
    // }),
    // rest.get('https://api.escuelajs.co/api/v1/auth/profile', (req, res, ctx) => {
    //     const token = req.headers.get("Authorization")?.split(' ')[1]
    //     const originalToken = token?.split('_')[0]
    //     const userId = token?.split('_')[1]
    //     console.log('token: ', token)
    //     const user = usersData.find(u => u.id === Number(userId))
    //     if (originalToken === access_token && user) {
    //         return res(ctx.json(user))
    //     }
    //     else {
    //         ctx.status(401)
    //         return res(ctx.text("Cannot authenticate user"))
    //     }
    // }),//my code
    rest.post(`https://api.escuelajs.co/api/v1/auth/login`, async (req, res, ctx) => {
        const { email, password } = await req.json();
        const foundUser = usersData.find(user => user.email === email && user.password === password);
        if (foundUser) {
          const refreshToken = jwtFixture.refresh_token;
          const accessToken = jwtFixture.access_token + '_' + foundUser.id
          return res(ctx.json({access_token: accessToken, refresh_token: refreshToken}));
        } else {
          ctx.status(401);
          return res(ctx.text('User was not authenticated'));
        }
      }),
    
      rest.get(`https://api.escuelajs.co/api/v1/auth/profile`, async (req, res, ctx) => {
        const token = req.headers.get('Authorization')?.split(' ')[1];
        const originalToken = token?.split('_')[0];
        const userId = token?.split('_')[1];
        const foundUser = usersData.find(user => user.id === Number(userId));
        if (originalToken === jwtFixture.access_token && foundUser) {
          return res(ctx.json(foundUser));
        } else {
          ctx.status(401);
          return res(ctx.text('Cannot authenticate user'));
        }
      }),
    rest.post("https://api.escuelajs.co/api/v1/users", async (req, res, ctx) => {
        const input : NewUser = await req.json()
        const user : User = {
                id: usersData.length +1,
                name: input.name,
                email: input.email,
                password :input.password,
                role: "customer",
                avatar:input.avatar
        }
        console.log("new user created")
        return res(ctx.json(user))
    }),
    rest.delete("https://api.escuelajs.co/api/v1/users/:id", async (req, res, ctx) => {
        const { id } = req.params
        if (usersData.find(u => u.id == Number(id))) {
            return res(
                ctx.json(true)
            )
        } else {
            return res(
                ctx.json(false)
            )
        }
    }),
    rest.put("https://api.escuelajs.co/api/v1/users/:id", async (req, res, ctx) => {
        const input : UserUpdate = await req.json()
        const { id } = req.params
        const userIndex = usersData.findIndex(u => u.id === Number(id))
        if (userIndex > -1) {
                const updatedUser : User = {
                    ...usersData[userIndex],
                    ...input
                }
                return res(ctx.json(updatedUser))
        } else {
            return res(ctx.status(400))
        }
    })
    
]

const userServer = setupServer(...handlers)

export default userServer