
class AuthenticationController < ApplicationController
  before_action :authorize_request, except: :login

  # POST /auth/login
  def login
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                     id: @user.id, last_name: @user.last_name, first_name: @user.first_name, middle_name: @user.middle_name, email: @user.email }, status: :ok
    else
      render json: { error: 'Incorrect credentials' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:email, :password)
  end
end