class UsersController < ApplicationController
  before_action :authorize_request, except: [:create]
  before_action :set_user, except: %i[create index]

  #GET /users
  def index
    @users = User.all.where({is_deleted: false})
    render json: @users, status: :ok
  end

  #GET /users/:id
  def show
    render json: @user, status: :ok
  end

  #POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: {errors: @user.errors.full_messages }, status: :unprocessable_entity
    end

  end

  #PUT /users/:id
  def update

    unless @user.update(user_params)
      render json: {errors: @user.errors.full_messages},
             status: :unprocessable_entity
    end

  end

  #DELETE /users/id
  def destroy

    if @user.update({is_deleted: true})
      render json: @user, status: :ok
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end

  end

  private

  def set_user
    @user = User.find(params[:id])

  rescue ActiveRecord::RecordNotFound
    render json: {errors: 'User not found'}, status: :not_found

  end

  def user_params
    params.permit(
      :last_name, :first_name, :middle_name, :email, :password
    )
  end
end
