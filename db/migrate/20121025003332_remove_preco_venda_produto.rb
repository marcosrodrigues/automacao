class RemovePrecoVendaProduto < ActiveRecord::Migration
  def up
    remove_column :produtos, :preco_venda
  end

  def down
    add_column :produtos, :preco_venda, :float
  end
end
