class CreateFornecedores < ActiveRecord::Migration
  def change
    create_table :fornecedores do |t|
      t.string :nome
      t.string :telefone

      t.timestamps
    end
  end
end
