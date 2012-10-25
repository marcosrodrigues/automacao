class AddQuantidadeProduto < ActiveRecord::Migration
  def change
    add_column :produtos, :quantidade, :integer, :default => 0
  end
end
