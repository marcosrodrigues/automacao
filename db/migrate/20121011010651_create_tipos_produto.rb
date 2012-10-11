class CreateTiposProduto < ActiveRecord::Migration
  def change
    create_table :tipos_produto do |t|
      t.string :descricao

      t.timestamps
    end
  end
end
