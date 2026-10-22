import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de Privacidade",
  description: "Como a Innovare Soluções em Crédito trata seus dados pessoais, conforme a Lei Geral de Proteção de Dados (LGPD).",
  path: "/politica-de-privacidade",
});

// TODO: revisar com o jurídico do cliente antes da publicação definitiva.
export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        migalhas={[
          { nome: "Início", path: "/" },
          { nome: "Política de privacidade", path: "/politica-de-privacidade" },
        ]}
        titulo="Política de Privacidade"
        texto="Transparência também no cuidado com os seus dados."
      />
      <section className="py-16 md:py-24">
        <div className="container-site">
          <article className="prosa mx-auto max-w-3xl text-lg [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-tinta">
            <p>
              Esta Política explica como a {site.nome}, inscrita no CNPJ {site.cnpj}, com endereço na {site.endereco.rua},{" "}
              {site.endereco.bairro}, {site.endereco.cidade} – {site.endereco.uf}, trata os dados pessoais de quem utiliza este
              site e os nossos canais de atendimento, nos termos da Lei nº 13.709/2018 (LGPD).
            </p>
            <h2>Quais dados coletamos</h2>
            <p>
              Este site não possui cadastro nem armazena formulários. Quando você usa o formulário de contato ou o simulador e
              escolhe falar conosco, a mensagem é aberta no WhatsApp, e os dados que você decidir enviar (como nome, cidade,
              serviço de interesse e informações da simulação) passam a ser tratados no nosso atendimento.
            </p>
            <p>
              Durante o atendimento, podemos solicitar documentos e informações necessários para consultar opções de crédito,
              como documento de identificação, CPF, comprovante de residência, dados do benefício ou do contracheque.
            </p>
            <h2>Para que usamos os dados</h2>
            <p>
              Para responder ao seu contato, consultar e apresentar opções de crédito, encaminhar propostas que você autorizar às
              instituições financeiras parceiras e cumprir obrigações legais e regulatórias.
            </p>
            <h2>Compartilhamento</h2>
            <p>
              Seus dados são compartilhados apenas com as instituições financeiras envolvidas na proposta que você autorizar e
              com prestadores necessários à operação, sempre na medida do necessário. Não vendemos dados pessoais.
            </p>
            <h2>Seus direitos</h2>
            <p>
              Você pode solicitar a confirmação do tratamento, o acesso, a correção, a anonimização, a portabilidade ou a
              eliminação dos seus dados, além de revogar consentimentos, pelo WhatsApp {site.whatsapp.exibicao}.
            </p>
            <h2>Cookies</h2>
            <p>
              No momento, este site não utiliza cookies de rastreamento ou publicidade. Se isso mudar, esta Política será
              atualizada e você será informado.
            </p>
            <h2>Atualizações</h2>
            <p>Esta Política pode ser atualizada a qualquer momento. A versão vigente estará sempre publicada nesta página.</p>
          </article>
        </div>
      </section>
    </>
  );
}
