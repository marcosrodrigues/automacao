# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format
# (all these examples are active by default):
ActiveSupport::Inflector.inflections do |inflect|
   #inflect.plural /^(ox)$/i, '\1en'
   #inflect.singular /^(ox)en/i, '\1'
   #inflect.irregular 'person', 'people'
   #inflect.uncountable %w( fish sheep )
   inflect.irregular 'tipo_produto', 'tipos_produto'
   inflect.irregular 'fornecedor', 'fornecedores'
   inflect.irregular 'conta_pagar', 'contas_pagar'
   inflect.irregular 'conta_receber', 'contas_receber'
   inflect.irregular 'preco_produto', 'precos_produto'
   inflect.irregular 'movimentacao_estoque', 'movimentacoes_estoque'
end
#
# These inflection rules are supported but not enabled by default:
# ActiveSupport::Inflector.inflections do |inflect|
#   inflect.acronym 'RESTful'
# end
