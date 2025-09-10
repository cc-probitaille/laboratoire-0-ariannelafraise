// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send("Arianne")
    await request.post('/api/v1/jeu/demarrerJeu').send("André-Louis")
  });

  it('scénario principal (succès)', async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
  });

  it('post-conditions (plus de joueur)', async () => {
    const response = await request.get('/stats');
    expect(response.body.joueurs.length).toBe(0)
  })
});