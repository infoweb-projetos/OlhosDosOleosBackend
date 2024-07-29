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

app.get('/api/test', (req: Request, res: Response) => {
    res.send('Backend está funcionando');
});

// Rota para cadastrar um novo usuário
app.post('/api/usuario', async (req: Request, res: Response) => {
    const { nome, tipo, localizacao, descricao, zap, insta, face, twitter, foto, Senha, Email } = req.body;
  
    try {
      // Inserir dados no Supabase
      const { error  } = await supabase
        .from('usuario')  // Nome da tabela no Supabase
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
        throw new Error(error.message);
      }
      console.log(error);
      if (!error) {
        console.log('Dados inseridos com sucesso');
        res.status(201).json(req.body);
      } else {
        console.log('400');
        res.status(400).json({ error: error });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });