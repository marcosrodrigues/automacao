class CreatePrecosProduto < ActiveRecord::Migration
  def change
    create_table :precos_produto do |t|
      t.references :produto
      t.date :data
      t.float :preco

      t.timestamps
    end
    add_index :precos_produto, :produto_id
  end
end
