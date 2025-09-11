// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import supertest from 'supertest';
import app from '../../src/app';
import { jeuRoutes } from '../../src/routes/jeuRouter';

const request = supertest(app);

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({nom: "Arianne" })
    await request.post('/api/v1/jeu/demarrerJeu').send({nom: "André-Louis" })
  });

  it('scénario principal (succès)', async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
  });

  it('post-conditions (plus de joueur)', async () => {
    const res1 = await request.post('/api/v1/jeu/demarrerJeu').send({nom: "Arianne" })
    const res2 = await request.post('/api/v1/jeu/demarrerJeu').send({nom: "André-Louis" })
    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    // Serait pas succès (201) si les joueurs n'avaient pas été supprimés par le redémarrage
  })
});