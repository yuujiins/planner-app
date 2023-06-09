class Api::V1::TasksController < ApplicationController
  before_action :authorize_request
  before_action :set_task, except: %i[create index]

  # GET /tasks/
  def index
    @tasks = @current_user.tasks.where({is_deleted: false}).order("status asc")

    if(!params[:task_date].nil?)
      @tasks = @tasks.where(:task_date => params[:task_date])
    end

    if(params[:category_id] != "null" && !params[:category_id].nil?)
      @tasks = @tasks.where("category_id = " + params[:category_id])
    end

    if(params[:sort] != "null" && !params[:sort].nil?)
      @tasks = @tasks.all.order("priority " + params[:sort])
    end

    render json: @tasks, status: :ok
  end

  # GET /tasks/?task_date=q&category_id=:id


  #GET /tasks/:id
  def show
    render json: @task, status:  :ok
  end

  #POST /tasks
  def create

    @task = Task.new(task_params)
    if @task.save
      render json: @task, status: :created
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
