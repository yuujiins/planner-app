require "test_helper"

class CategoryTest < ActiveSupport::TestCase

  test "do not add categories without required params" do
    category = Category.new

    assert_not category.save
  end

  test "add category" do
    data = {
      name: 'Sample',
      description: 'Sample description',
      user_id: users(:one).id
    }
    category = Category.new(data)

    assert category.save
  end

  test "update category" do
    category = categories(:one)
    assert_changes 'category.name' do
      category.name = "Changed name"
    end
  end

  test "fail to delete category when in use" do
    category = categories(:one)
    assert_raise ActiveRecord::InvalidForeignKey do
      category.destroy
    end
  end

  test "delete category when not in use" do
    category = categories(:two)
    assert category.destroy
  end

end
