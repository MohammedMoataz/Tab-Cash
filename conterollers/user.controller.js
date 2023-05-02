// import db from '../../database/database.js'

// const USER = db.user

// export default {

//     register: async (args, req) => {
//         let email = args.email
//         let password = args.password

//         const new_user = new USER({
//             email: email,
//             password: region
//         })

//         return await new_region.save()
//             .catch(err => console.error(err))
//     },

//     getAllByParentId: async (args, req) => {
//         return await USER.findAll({
//             where: { p_id: args.parent_id }
//         })
//             .then(res => res
//                 .filter(region => region.dataValues.id > 1)
//                 .map(region => region.dataValues))
//             .catch(err => console.log(err))
//     },

//     getAll: async () => {
//         return await USER.findAll()
//             .then(res => res
//                 .filter(region => region.dataValues.id > 1)
//                 .map(region => region.dataValues))
//             .catch(err => err)
//     },


    

//     update: async (args, req) => {
//         let id = args.id
//         let region = args.region.trim()

//         let isUpdated = await USER.update({
//             region: region
//         }, {
//             where: { id: id }
//         })
//             .catch(err => console.error(err))

//         return isUpdated !== 0
//     }

// }
