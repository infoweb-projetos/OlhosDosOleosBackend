import express, { Request, Response } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const supabaseUrl = 'https://ehqpuutchlhuztwcmjwb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocXB1dXRjaGxodXp0d2NtandiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjA0NDU4MSwiZXhwIjoyMDM3NjIwNTgxfQ.1HEaNhn93f2t2Dv93XITUA0uPYpIOsAO-r8nOa0ZZC0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Rota para cadastrar um novo usuário
app.post('/api/usuario', async (req: Request, res: Response) => {
  const { nome, tipo, localizacao, descricao, zap, insta, face, twitter, foto, Senha, Email } = req.body;

  try {
    const { data, error } = await supabase
      .from('usuario')
      .insert(
        {
          nome: nome,
          tipo: tipo,
          localizacao: localizacao,
          descricao: descricao,
          zap: zap,
          insta: insta,
          face: face,
          twitter: twitter,
          foto: foto,
          Senha: Senha,
          Email: Email,
        }
      );
    if (error) {
      console.log(error.message);
      let msgErro = error.message.toString().toLowerCase();
      if (msgErro.includes('null value in column "senha"')) {
        msgErro = 'O campo de senha esta vazia, preencha sua senha.';
      }
      else if (msgErro.includes('null value in column "nome"')) {
        msgErro = 'O campo de usuario esta vazio, preencha o seu nome de usuario.';
      }
      else if (msgErro.includes('null value in column "email"')) {
        msgErro = 'O campo de email esta vazio, preencha seu email.';
      }
      else if (msgErro.includes('duplicate key value')) {
        msgErro = 'E-mail já cadastrado. Por favor, use um e-mail diferente.';
      }

      return res.status(400).json({ error: msgErro });
    }

    if (data) console.log('Dados inseridos com sucesso:', data);
    if (data) res.status(201).json({ data: data[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Rota para obter cidades
app.get('/api/paises', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('pais')
      .select('nome');

    if (error) {
      throw new Error(error.message);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter paises' });
  }
});

// Rota para obter cidades
app.get('/api/estados', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('estado')
      .select('nome');

    if (error) {
      throw new Error(error.message);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter estados' });
  }
});

// Rota para obter cidades
app.get('/api/cidades', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('cidade') 
      .select('nome');

    if (error) {
      throw new Error(error.message);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter cidades' });
  }
});

// Rota para obter especializações
app.get('/api/especializacoes', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('especializacao') 
      .select('nome');

    if (error) {
      throw new Error(error.message);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter especializações' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});