// topics
// by Daniel Rodríguez
// MIT Licensed

define('UserModel', ['backbone'], function(B) {
  var User

  User = B.Model.extend({
    urlRoot     : 'api/1/user'
  , idAttribute : '_id'
  , defaults    : {
      user_id     : ''
    , screen_name : ''
    , stats     : {
        topics  : 0
      , notes   : 0
      , visits  : 0
      }
    }
  , validate : function(user) {

      if (!user.user_id) {
        return 'Invalid User Id'
      }
      if (!user.screen_name) {
        return 'Invalid Screen Name'
      }

    }
  })

  return User
})
