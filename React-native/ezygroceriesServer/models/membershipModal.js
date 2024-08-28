import db from "../config/application.js";

export const membershipModal = {
    getMembershipfromcustomer: (id) => {
        return new Promise((resolve, reject)=>{
            db.query('select membership.total_amount, name, description,membership.id  from shops inner join membership on membership.shop_id = shops.id inner join customers on customers.id = membership.customer_id where customers.id = ?;',[id],(err, result)=>{
                if(err){
                    reject(err);
                }else{{
                    resolve(result)
                }}
            })
        })
    },
    getMembershipfromshop: (shop_id) => {
        return new Promise((resolve, reject)=>{
            db.query('select membership.total_amount, name , membership.id from customers  inner join membership on membership.shop_id = customers.id inner join shops on shops.id = membership.shop_id where shops.id = ?;',[shop_id],(err, result)=>{
                if(err){
                    reject(err);
                }else{{
                    resolve(result)
                }}
            })
        })
    },
    createMemberShip: (email,shop_id, total_amount) => {
        db.query('select id from customers where email = ? ',[email],(err,result1)=>{
            if(err){
                reject(err);
            }else{
                console.log("------------ result 1 -----------",result1);
                if(result1.length > 0){
                    db.query('insert into membership (shop_id, customer_id, total_amount) values ( ?, ?, ? )',[shop_id, result1[0].id, total_amount],(err, result2)=>{
                        if(err){
                            reject(err);
                        }else{
                            resolve(result2)
                        }
                    })
                }else{
                    reject(result1)
                }
            }
        })
    }
}
