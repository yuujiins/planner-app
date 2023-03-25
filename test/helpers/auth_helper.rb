module AuthHelper

  def set_headers(user)
    payload = {user_id: user.id}
    secret = Rails.application.secrets.secret_key_base.to_s
    return { Authorization: JWT.encode(payload, secret)}
  end
end