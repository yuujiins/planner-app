class Api::V1::TasksController < ApplicationController
  before_action :authorize_request
  before_action :set_task, except: %i[create index]

  # GET /tasks/
  def index
    @tasks = @current_user.tasks.where({is_deleted: false})
    render json: @tasks, status: :ok
  end

  #GET /tasks/:id
  def show
    render json: @task, status:  :ok
  end

  #POST /tasks
  def create

    @task = Task.new(task_params)
    if @task.save
      render json: @task, status: :ok
    else
      render json: {errors: @task.errors.full_messages}, status: :unprocessable_entity
    end

  end

  #PUT /tasks/:id
  def update
    unless @task.update(task_params)
      render json: {errors: @task.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/:id
  def destroy
    if @task.update({is_deleted: true})
      render json: @task, status: :ok
    else
      render json: {errors: @task.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  def set_task
    @task = Task.where({is_deleted: false, id: params[:id]}).first

  rescue ActiveRecord::RecordNotFound => e
    render json: {errors: e.message}, status: :not_found
  end

  def task_params
    params.permit(:name, :status, :priority, :task_date, :category_id)
  end
end
