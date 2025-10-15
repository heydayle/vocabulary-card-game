import { v4 as uuid } from 'uuid';
import type { Card } from '../models/Card';

const now = Date.now();

export const seededCards: Card[] = [
  {
    id: uuid(),
    word: 'serendipity',
    definition: 'Sự tình cờ may mắn mang lại một phát hiện vui vẻ.',
    phonetics: '/ˌser.ənˈdɪp.ə.ti/',
    example: 'Finding that café was pure serendipity on our trip.',
    tags: ['advanced', 'noun'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'meticulous',
    definition: 'Tỉ mỉ, chăm chút đến từng chi tiết nhỏ.',
    phonetics: '/məˈtɪk.jə.ləs/',
    example: 'She kept meticulous notes during the experiment.',
    tags: ['adjective'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'eloquent',
    definition: 'Hùng hồn, nói năng lưu loát và thuyết phục.',
    phonetics: '/ˈel.ə.kwənt/',
    example: 'The activist delivered an eloquent speech about equality.',
    tags: ['adjective'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'resilient',
    definition: 'Kiên cường, có khả năng phục hồi sau khó khăn.',
    phonetics: '/rɪˈzɪl.jənt/',
    example: 'Children are often more resilient than we expect.',
    tags: ['adjective'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'empathy',
    definition: 'Khả năng thấu cảm và hiểu cảm xúc của người khác.',
    phonetics: '/ˈem.pə.θi/',
    example: 'Empathy helps us build stronger relationships.',
    tags: ['noun'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'innovate',
    definition: 'Đổi mới, đưa ra ý tưởng hoặc phương pháp mới.',
    phonetics: '/ˈɪn.ə.veɪt/',
    example: 'The company continues to innovate in renewable energy.',
    tags: ['verb'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'tranquil',
    definition: 'Yên bình, tĩnh lặng và thư thái.',
    phonetics: '/ˈtræŋ.kwɪl/',
    example: 'We enjoyed a tranquil afternoon by the lake.',
    tags: ['adjective'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'persevere',
    definition: 'Kiên trì tiếp tục dù gặp khó khăn.',
    phonetics: '/ˌpɜː.sɪˈvɪər/',
    example: 'You must persevere if you want to master a language.',
    tags: ['verb'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'versatile',
    definition: 'Đa năng, có nhiều công dụng hoặc khả năng.',
    phonetics: '/ˈvɜː.sə.taɪl/',
    example: 'A versatile tool can solve many problems.',
    tags: ['adjective'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'radiant',
    definition: 'Rạng rỡ, phát sáng hoặc tràn đầy hạnh phúc.',
    phonetics: '/ˈreɪ.di.ənt/',
    example: 'Her radiant smile lit up the room.',
    tags: ['adjective'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'curiosity',
    definition: 'Tính tò mò, mong muốn học hỏi những điều mới.',
    phonetics: '/ˌkjʊə.riˈɒs.ə.ti/',
    example: 'Curiosity drives scientific discovery.',
    tags: ['noun'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'adaptable',
    definition: 'Có khả năng thích nghi nhanh chóng.',
    phonetics: '/əˈdæp.tə.bəl/',
    example: 'An adaptable mindset helps you thrive in change.',
    tags: ['adjective'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'collaborate',
    definition: 'Hợp tác làm việc cùng nhau.',
    phonetics: '/kəˈlæb.ə.reɪt/',
    example: 'Teams collaborate to solve complex problems.',
    tags: ['verb'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'gratitude',
    definition: 'Lòng biết ơn và trân trọng.',
    phonetics: '/ˈɡræt.ɪ.tʃuːd/',
    example: 'Expressing gratitude can improve your mood.',
    tags: ['noun'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'luminescent',
    definition: 'Phát sáng dịu nhẹ trong bóng tối.',
    phonetics: '/ˌluː.mɪˈnes.ənt/',
    example: 'Fireflies create a luminescent glow at night.',
    tags: ['adjective'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'endeavor',
    definition: 'Nỗ lực cố gắng để đạt được điều gì đó.',
    phonetics: '/enˈdev.ər/',
    example: 'Learning every day is a worthy endeavor.',
    tags: ['noun', 'verb'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'uplift',
    definition: 'Làm ai đó cảm thấy tích cực hơn.',
    phonetics: '/ʌpˈlɪft/',
    example: 'Kind words can uplift your friends.',
    tags: ['verb'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  },
  {
    id: uuid(),
    word: 'diligent',
    definition: 'Chăm chỉ và tận tụy.',
    phonetics: '/ˈdɪl.ɪ.dʒənt/',
    example: 'She is diligent about practicing vocabulary daily.',
    tags: ['adjective'],
    createdAt: now,
    updatedAt: now,
    correctCount: 0,
    wrongCount: 0
  }
];
