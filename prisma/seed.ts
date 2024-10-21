import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.cidade.deleteMany({});
    await prisma.estado.deleteMany({});
    await prisma.tipoArtista.deleteMany({});
    await prisma.categoria.deleteMany({});

    const tiposArtista = [
        'Artista Digital',
        'Pintor de Aquarela',
        'Quadrinista',
        'Artista 3D',
        'Ilustrador',
        'Grafiteiro'
    ];

    for (const tipo of tiposArtista) {
        await prisma.tipoArtista.create({
            data: { nome: tipo },
        });
    }

    const categoriasPost = [
        'Arte Digital',
        'Aquarela',
        'Quadrinhos',
        '3D',
        'Grafite',
        'Surrealista',
        'Realista'
    ];

    for (const categoria of categoriasPost) {
        await prisma.categoria.create({
            data: { nome: categoria },
        });
    }

    const estados = [
        { nome: 'Acre' },
        { nome: 'Alagoas' },
        { nome: 'Amapá' },
        { nome: 'Amazonas' },
        { nome: 'Bahia' },
        { nome: 'Ceará' },
        { nome: 'Distrito Federal' },
        { nome: 'Espírito Santo' },
        { nome: 'Goiás' },
        { nome: 'Maranhão' },
        { nome: 'Mato Grosso' },
        { nome: 'Mato Grosso do Sul' },
        { nome: 'Minas Gerais' },
        { nome: 'Pará' },
        { nome: 'Paraíba' },
        { nome: 'Paraná' },
        { nome: 'Pernambuco' },
        { nome: 'Piauí' },
        { nome: 'Rio de Janeiro' },
        { nome: 'Rio Grande do Norte' },
        { nome: 'Rio Grande do Sul' },
        { nome: 'Rondônia' },
        { nome: 'Roraima' },
        { nome: 'Santa Catarina' },
        { nome: 'São Paulo' },
        { nome: 'Sergipe' },
        { nome: 'Tocantins' }
    ];

    for (const estado of estados) {
        await prisma.estado.create({
            data: estado,
        });
    }

    const cidades = {
        'Acre': ['Rio Branco', 'Cruzeiro do Sul', 'Senador Guiomard', 'Tarauacá'],
        'Alagoas': ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Penedo'],
        'Amapá': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque'],
        'Amazonas': ['Manaus', 'Parintins', 'Itacoatiara', 'Tabatinga'],
        'Bahia': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari'],
        'Ceará': ['Fortaleza', 'Juazeiro do Norte', 'Sobral', 'Crato'],
        'Distrito Federal': ['Brasília'],
        'Espírito Santo': ['Vitória', 'Serra', 'Cariacica', 'Vila Velha'],
        'Goiás': ['Goiânia', 'Anápolis', 'Aparecida de Goiânia', 'Rio Verde'],
        'Maranhão': ['São Luís', 'Imperatriz', 'Caxias', 'Codó'],
        'Mato Grosso': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop'],
        'Mato Grosso do Sul': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá'],
        'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora'],
        'Pará': ['Belém', 'Ananindeua', 'Santarém', 'Marabá'],
        'Paraíba': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos'],
        'Paraná': ['Curitiba', 'Londrina', 'Maringá', 'Foz do Iguaçu'],
        'Pernambuco': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru'],
        'Piauí': ['Teresina', 'Parnaíba', 'Picos', 'Floriano'],
        'Rio de Janeiro': ['Rio de Janeiro', 'Niterói', 'São Gonçalo', 'Duque de Caxias'],
        'Rio Grande do Norte': ['Natal', 'Mossoró', 'Parnamirim', 'Caicó'],
        'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria'],
        'Rondônia': ['Porto Velho', 'Ji-Paraná', 'Cacoal', 'Vilhena'],
        'Roraima': ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'São João da Baliza'],
        'Santa Catarina': ['Florianópolis', 'Joinville', 'Blumenau', 'Chapecó'],
        'São Paulo': ['São Paulo', 'Campinas', 'Santos', 'São Bernardo do Campo'],
        'Sergipe': ['Aracaju', 'Socorro', 'Itabaiana', 'Lagarto'],
        'Tocantins': ['Palmas', 'Araguaína', 'Paraíso do Tocantins', 'Gurupi']
    };

    for (const [estadoNome, cidadesList] of Object.entries(cidades)) {
        const estadoRecord = await prisma.estado.findFirst({
            where: { nome: estadoNome },
        });

        if (estadoRecord) {
            for (const cidadeNome of cidadesList) {
                await prisma.cidade.create({
                    data: {
                        nome: cidadeNome,
                        estadoid: estadoRecord.id,
                    },
                });
            }
        } else {
            console.warn(`Estado ${estadoNome} não encontrado para adicionar cidades`);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
