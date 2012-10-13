class CreateProdutos < ActiveRecord::Migration
  def change
    create_table :produtos do |t|
      t.references :tipo_produto
      t.string :descricao
      t.string :codigo_barras
      t.float :preco_venda

      t.timestamps
    end
    add_index :produtos, :tipo_produto_id
  end
end
