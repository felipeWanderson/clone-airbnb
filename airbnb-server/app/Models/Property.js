'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Database = use('Database')

class Property extends Model {
    user () {
        return this.belongsTo('App/Models/User')
      }
    
      images () {
        return this.hasMany('App/Models/Image')
      }

      static scopeNearBy(query, latitude, logitude, distance){
        const haversine = `(6371 * acos(cos(radians(${latitude}))
        * cos(radians(latitude)) 
        * cos(radians(longitude)
        - radians(${logitude}))
        + sin(radians(${latitude}))
        * sin(radians(latitude))))`


        return query
        .select('*', Database.raw(`${haversine} as distance`))
        .where(`${haversine} < ${distance}`)
      }
}

module.exports = Property
