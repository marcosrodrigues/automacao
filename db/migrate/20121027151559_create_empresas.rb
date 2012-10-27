class CreateEmpresas < ActiveRecord::Migration
  def change
    create_table :empresas do |t|
      t.string :razao_social
      t.string :nome_fantasia
      t.string :cnpj
      t.string :sigla

      t.timestamps
    end
  end
end
