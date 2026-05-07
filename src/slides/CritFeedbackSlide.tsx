import figmacrit from "../assets/figmacrit/figmacrit.png";
import affordanceBad from "../assets/figmacrit/affordancebadclickability.png";
import affordanceGood from "../assets/figmacrit/affordancegoodcliability.png";

const H = "clamp(56px, 6.5vw, 82px)";
const ITEM = "clamp(18px, 1.8vw, 23px)";

const feedbackItems = [
  { text: "Pay attention to icon sizing for buttons, not just spacing" },
  { text: "Design according to text reading order" },
  {
    text: "Be conscious of affordances for clickability",
    affordances: true,
  },
];

export default function CritFeedbackSlide() {
  return (
    <div className="w-full h-full bg-white flex px-16 pt-10 pb-6 gap-8">
      {/* left: title + items */}
      <div className="flex flex-col gap-6 flex-1">
        <h2
          className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black shrink-0"
          style={{ fontSize: H }}
        >
          Crit Feedback
        </h2>

        <div className="flex flex-col gap-3">
          {feedbackItems.map((item, i) => (
            <div
              key={i}
              className="animate-fade-up p-5 rounded-xl border border-black/8 hover:border-black/22 transition-all duration-300"
              style={{ animationDelay: `${130 + i * 100}ms` }}
            >
              <div className="flex-1">
                <p
                  className="text-black font-['Inter',sans-serif] leading-snug"
                  style={{ fontSize: ITEM }}
                >
                  {item.text}
                </p>
                {item.affordances && (
                  <div className="flex gap-3 mt-3">
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="text-xs text-black/35 font-medium">
                        Before
                      </span>
                      <img
                        src={affordanceBad}
                        alt="Poor clickability affordance"
                        className="w-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="text-xs text-black/35 font-medium">
                        After
                      </span>
                      <img
                        src={affordanceGood}
                        alt="Good clickability affordance"
                        className="w-full rounded-lg object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* right: figma crit screenshot */}
      <div className="animate-fade-up delay-200 w-140 shrink-0 self-stretch flex flex-col">
        <img
          src={figmacrit}
          alt="Figma crit file"
          className="w-full flex-1 object-contain rounded-2xl min-h-0 bg-black/3"
        />
      </div>
    </div>
  );
}
