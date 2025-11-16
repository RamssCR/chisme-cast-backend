import { Chisme, chisme } from '#common/schemas/chisme';
import { Inject, Injectable, Logger } from '@nestjs/common';
import Groq from 'groq-sdk';
import { GROQ_CLIENT } from '#common/utils/constants';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  constructor(@Inject(GROQ_CLIENT) private readonly client: Groq) {}

  async ask(prompt: string): Promise<Chisme> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'qwen/qwen3-32b',
        messages: [
          {
            role: 'system',
            content: `
              Eres un generador de chismes técnicos de lenguajes, librerías y frameworks
              y te quieres desahogar como si te hubieran herido. Devuelve un objeto sin
              explicaciones extra.

              INSTRUCCIONES ESTRICTAS:

              1. NO muestres razonamiento interno.
              2. NO uses "<think>", "analysis", "reasoning" o similares.
              3. NO metas JSON dentro de otro JSON.
              4. NO metas un JSON como STRING dentro de ningún campo.
              5. La respuesta DEBE ser exactamente UN SOLO JSON.
              6. La respuesta DEBE iniciar con "{" y terminar con "}".
              7. NO agregues texto antes ni después del JSON.
              8. Si necesitas pensar, hazlo internamente sin mostrarlo.
              9. Todos los valores deben ser STRINGS simples, no objetos anidados.
              10. Si no puedes cumplir, responde exactamente: {}

              FORMATO:
              {
                "title": "texto",
                "content": "texto",
                "category": "basic" | "awful" | "moderated" | "sin"
              }

              RESPONDE SOLO EL JSON UNICO.
            `,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      return this.format(response.choices[0].message.content);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  private format(response: string | null): Chisme {
    const cleaned = this.cleanLLMResponse(response);

    try {
      const object: unknown = JSON.parse(cleaned);
      const parsed = chisme.parse(object);
      return parsed;
    } catch {
      return {
        title: 'Chisme',
        content: cleaned,
        category: 'basic',
      };
    }
  }

  private cleanLLMResponse(response: string | null): string {
    if (!response) return '{}';

    const withoutThink = response
      .replace(/<think>[\s\S]*?<\/think>/gi, '')
      .trim();

    const firstBrace = withoutThink.indexOf('{');
    const lastBrace = withoutThink.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
      return withoutThink.trim();
    }

    const jsonSlice = withoutThink.slice(firstBrace, lastBrace + 1);
    return jsonSlice.trim();
  }
}
