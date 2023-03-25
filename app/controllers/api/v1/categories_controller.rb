class Api::V1::CategoriesController < ApplicationController
  before_action :authorize_request
  before_action :set_category, except: %i[create, index]

  #GET /categories
  def index
    @categories = Category.where({is_deleted: false, user_id: @current_user.id}).all
    render json: @categories, status: :ok
  end

  #GET /categories/:id
  def show
    render json: @category, status: :ok
  end

  #GET /categories/:id/tasks
  def list
    render json: @category.tasks.where({is_deleted: false}), status: :ok
  end

  #POST /categories
  def create
    @category = Category.new(category_params)
    @category.user_id = @current_user.id

    if @category.save
      render json: @category, status: :created
    else
      render json: {errors: @category.errors.full_messages}, status: :unprocessable_entity
    end

  end

  #PUT /categories/:id
  def update
    unless @category.update(category_params)
      render json: {error: @category.errors.full_messages},
             status: :unprocessable_entity
    end
  end

  #DELETE /categories/:id
  def destroy
    if(@category.tasks.where({is_deleted: false}).length > 0)
      render json: {errors: "Category is in use!"}, status: :unprocessable_entity
    else
      if(@category.update({is_deleted: true}))
        render json: @category, status: :ok
      else
        render json: {errors: @category.errors.full_messages}, status: :unprocessable_entity
      end
    end
  end

  private

  def set_category
    @category = Category.where({is_deleted: false, id:params[:id]}).first

  rescue ActiveRecord::RecordNotFound
    render json: {errors: 'Category not found'}, status: :not_found
  end

  def category_params
    params.permit(:name, :description)
  end

end
