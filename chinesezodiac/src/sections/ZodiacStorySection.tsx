import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, Sparkles } from 'lucide-react';

const zodiacStory = {
  title: "The Great Race: How the 12 Zodiac Animals Were Chosen",
  intro: "Long ago, the Jade Emperor, ruler of Heaven, decided to create a calendar to measure time. He decreed that the first twelve animals to cross the finish line of a great race would have years named after them, forever immortalized in the Chinese Zodiac.",
  chapters: [
    {
      title: "The Emperor's Announcement",
      animal: null,
      icon: "👑",
      content: "The Jade Emperor sent word across the land that all animals should gather at the Heavenly River for a great race. The prize? Eternal honor in the calendar that would guide humanity for millennia. Animals from every corner of the earth prepared for this once-in-eternity opportunity."
    },
    {
      title: "The Clever Rat 🐀",
      animal: "Rat",
      icon: "🐀",
      content: "The Rat, being small but incredibly clever, knew he couldn't win on speed alone. He approached the strong Ox, known for his determination and early rising. 'Dear Ox,' said the Rat, 'would you give me a ride across the river?' The kind Ox agreed, not knowing the Rat's true plan. As they approached the finish line, the Rat leaped from the Ox's head and crossed first, claiming the first position in the Zodiac."
    },
    {
      title: "The Diligent Ox 🐂",
      animal: "Ox",
      icon: "🐂",
      content: "The Ox, despite being tricked by the Rat, didn't complain. His steady determination and honest nature had carried him through the night when others slept. Though he finished second, the Ox remained content, knowing his efforts were genuine. His reliability and strength would forever be honored in the second position of the Zodiac."
    },
    {
      title: "The Fierce Tiger 🐅",
      animal: "Tiger",
      icon: "🐅",
      content: "The powerful Tiger bounded through the race with confidence. He was strong and fast, but the river's current slowed even his mighty strokes. Emerging soaked but undeterred, the Tiger roared across the finish line in third place. His courage and competitiveness had earned him a worthy position among the Zodiac animals."
    },
    {
      title: "The Lucky Rabbit 🐇",
      animal: "Rabbit",
      icon: "🐇",
      content: "The Rabbit was swift on land but struggled with the wide river. Just as hope seemed lost, he spotted logs floating downstream. Hopping from log to log with agility and luck, the Rabbit made it across and bounded to fourth place. Some say a fortunate gust of wind even helped push his final log to shore."
    },
    {
      title: "The Majestic Dragon 🐉",
      animal: "Dragon",
      icon: "🐉",
      content: "Everyone expected the Dragon, who could fly, to win easily. But the Dragon had stopped to bring rain to drought-stricken villages along the way. He also paused to help the Rabbit by blowing air to push his log to shore. His compassion delayed him, but his nobility earned him the fifth position—and the eternal respect of all creatures."
    },
    {
      title: "The Wise Snake 🐍",
      animal: "Snake",
      icon: "🐍",
      content: "The Snake was clever and knew he couldn't match larger animals in speed. He quietly wrapped himself around the Horse's leg, unseen. As the Horse approached the finish line, the Snake slithered out, startling the Horse and slipping into sixth place. His cunning and patience had served him well."
    },
    {
      title: "The Free Horse 🐎",
      animal: "Horse",
      icon: "🐎",
      content: "The Horse galloped with wild freedom, his mane flowing in the wind. Victory seemed certain until the Snake's surprise appearance made him rear back in shock. Though he finished seventh, the Horse remained spirited, knowing his love of freedom and speed would inspire generations to come."
    },
    {
      title: "The Gentle Goat 🐐",
      animal: "Goat",
      icon: "🐐",
      content: "The Goat, Monkey, and Rooster found a raft together. Working as a team, the Rooster spotted the best path, the Monkey cleared debris, and the Goat gently steered through the currents. The Jade Emperor, impressed by their cooperation, let the Goat—who had been most calm and nurturing—finish eighth."
    },
    {
      title: "The Clever Monkey 🐒",
      animal: "Monkey",
      icon: "🐒",
      content: "The mischievous Monkey swung from trees and solved problems with ease. After helping clear the raft's path with quick thinking and nimble hands, he scampered across the finish line in ninth place. His intelligence and playfulness had made the journey an adventure rather than a trial."
    },
    {
      title: "The Proud Rooster 🐓",
      animal: "Rooster",
      icon: "🐓",
      content: "The Rooster's keen eyes had guided the raft team to safety. His loud crow had awakened his teammates each morning, keeping them on schedule. Though tenth to finish, the Rooster strutted proudly, knowing his punctuality and observation skills had helped everyone succeed."
    },
    {
      title: "The Loyal Dog 🐕",
      animal: "Dog",
      icon: "🐕",
      content: "The Dog was an excellent swimmer, but he loved water so much that he couldn't resist playing in the river. He splashed, dove, and frolicked, forgetting about the race entirely. Only when he noticed others finishing did he paddle to shore, arriving in eleventh place. His playful, loyal nature made him beloved despite his distraction."
    },
    {
      title: "The Generous Pig 🐖",
      animal: "Pig",
      icon: "🐖",
      content: "The Pig started the race, grew hungry, and stopped for a feast. After eating, he felt sleepy and took a nap. When he finally awoke and remembered the race, he hurried to the finish line, arriving twelfth and last. But the Jade Emperor smiled—the Pig's contentment and generosity made him a perfect addition to complete the Zodiac."
    },
    {
      title: "The Cat's Tale 🐱",
      animal: null,
      icon: "🐱",
      content: "And what of the Cat? The Cat, too, had asked the Rat for help. But the Rat, fearing competition, never woke the Cat on race day. The Cat slept through the entire event and was never included in the Zodiac. To this day, cats chase rats in revenge for this ancient betrayal—and cats never forgive, never forget."
    }
  ],
  moral: "Each animal earned their place not just through speed, but through their unique qualities. The Zodiac teaches us that every personality has value—whether clever like the Rat, diligent like the Ox, brave like the Tiger, or content like the Pig. Your animal sign reflects these ancient virtues within you."
};

export function ZodiacStorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-amber-50 via-orange-50 to-red-50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            <BookOpen className="w-4 h-4" />
            Ancient Legend
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {zodiacStory.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {zodiacStory.intro}
          </p>
        </motion.div>

        {/* Story Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Preview - Always Visible */}
          <div className="p-8 md:p-10">
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-5xl">📜</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">The Great Race</h3>
                <p className="text-gray-500">A tale of wit, wisdom, and wonder</p>
              </div>
            </motion.div>

            {/* First Chapter Preview */}
            <motion.div
              className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{zodiacStory.chapters[0].icon}</span>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">{zodiacStory.chapters[0].title}</h4>
                  <p className="text-gray-600 leading-relaxed">{zodiacStory.chapters[0].content}</p>
                </div>
              </div>
            </motion.div>

            {/* Expand Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Hide Full Story
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Read the Complete Legend
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>

          {/* Expanded Story Content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-8 md:px-10 pb-10 space-y-6">
              {zodiacStory.chapters.slice(1).map((chapter, index) => (
                <motion.div
                  key={index}
                  className={`rounded-2xl p-6 cursor-pointer transition-all ${
                    activeChapter === index
                      ? 'bg-gradient-to-r from-red-100 to-orange-100 shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveChapter(activeChapter === index ? null : index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.span 
                      className="text-4xl"
                      animate={activeChapter === index ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {chapter.icon}
                    </motion.span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        {chapter.title}
                        {chapter.animal && (
                          <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-500 shadow-sm">
                            #{zodiacStory.chapters.slice(1).indexOf(chapter) + 1}
                          </span>
                        )}
                      </h4>
                      <motion.p 
                        className="text-gray-600 leading-relaxed"
                        initial={false}
                        animate={{ 
                          height: activeChapter === index ? 'auto' : '3em',
                          overflow: 'hidden'
                        }}
                      >
                        {chapter.content}
                      </motion.p>
                      {activeChapter !== index && chapter.content.length > 150 && (
                        <span className="text-red-500 text-sm font-medium">Tap to read more...</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Moral */}
              <motion.div
                className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">✨</span>
                  <div>
                    <h4 className="font-bold text-purple-800 mb-2">The Wisdom of the Zodiac</h4>
                    <p className="text-purple-700 leading-relaxed italic">{zodiacStory.moral}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
