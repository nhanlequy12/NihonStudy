// Từ vựng N2 theo chủ đề. Mỗi từ: word (kanji/kana), reading (kana), meaning (VI), pos, examples [{jp, vi}]
// Để thêm từ mới: thêm object vào mảng words của chủ đề tương ứng, id sẽ tự sinh.

export const basicTopics = [
  {
    id: 'work',
    title: 'Công việc & Văn phòng',
    jp: '仕事・職場',
    icon: '💼',
    color: '#4f8cff',
    words: [
      { word: '就職', reading: 'しゅうしょく', meaning: 'xin việc, đi làm (sau tốt nghiệp)', pos: 'danh từ・する', examples: [
        { jp: '彼は大手企業に就職した。', vi: 'Anh ấy đã vào làm ở một công ty lớn.' },
        { jp: '就職活動は思ったより大変だ。', vi: 'Việc tìm việc vất vả hơn tôi nghĩ.' } ] },
      { word: '残業', reading: 'ざんぎょう', meaning: 'làm thêm giờ, tăng ca', pos: 'danh từ・する', examples: [
        { jp: '今週は毎日残業が続いている。', vi: 'Tuần này ngày nào cũng phải tăng ca.' },
        { jp: '残業代はきちんと払われますか。', vi: 'Tiền tăng ca có được trả đầy đủ không?' } ] },
      { word: '締め切り', reading: 'しめきり', meaning: 'hạn chót, deadline', pos: 'danh từ', examples: [
        { jp: 'レポートの締め切りは金曜日です。', vi: 'Hạn nộp báo cáo là thứ Sáu.' },
        { jp: '締め切りに間に合わないかもしれない。', vi: 'Có lẽ tôi không kịp hạn chót.' } ] },
      { word: '取引', reading: 'とりひき', meaning: 'giao dịch, làm ăn', pos: 'danh từ・する', examples: [
        { jp: 'この会社とは長年取引がある。', vi: 'Chúng tôi đã làm ăn với công ty này nhiều năm.' },
        { jp: '取引先に挨拶に行く。', vi: 'Đi chào hỏi đối tác làm ăn.' } ] },
      { word: '打ち合わせ', reading: 'うちあわせ', meaning: 'họp bàn, trao đổi trước', pos: 'danh từ・する', examples: [
        { jp: '午後はお客様と打ち合わせがある。', vi: 'Chiều nay có buổi họp bàn với khách hàng.' },
        { jp: '打ち合わせの時間を変更したい。', vi: 'Tôi muốn đổi giờ họp bàn.' } ] },
      { word: '担当', reading: 'たんとう', meaning: 'phụ trách, đảm nhiệm', pos: 'danh từ・する', examples: [
        { jp: '私はこのプロジェクトを担当している。', vi: 'Tôi đang phụ trách dự án này.' },
        { jp: '担当者に直接聞いてください。', vi: 'Hãy hỏi trực tiếp người phụ trách.' } ] },
      { word: '昇進', reading: 'しょうしん', meaning: 'thăng chức', pos: 'danh từ・する', examples: [
        { jp: '彼女は課長に昇進した。', vi: 'Cô ấy được thăng chức lên trưởng phòng.' },
        { jp: '昇進のお祝いに食事に行こう。', vi: 'Đi ăn để mừng thăng chức nào.' } ] },
      { word: '退職', reading: 'たいしょく', meaning: 'nghỉ việc, nghỉ hưu', pos: 'danh từ・する', examples: [
        { jp: '父は来年退職する予定だ。', vi: 'Bố tôi dự định nghỉ hưu vào năm sau.' },
        { jp: '退職の理由を聞かれた。', vi: 'Tôi bị hỏi lý do nghỉ việc.' } ] },
      { word: '面接', reading: 'めんせつ', meaning: 'phỏng vấn', pos: 'danh từ・する', examples: [
        { jp: '明日、面接を受ける。', vi: 'Ngày mai tôi đi phỏng vấn.' },
        { jp: '面接では自己紹介が大切だ。', vi: 'Trong phỏng vấn, phần giới thiệu bản thân rất quan trọng.' } ] },
      { word: '給料', reading: 'きゅうりょう', meaning: 'tiền lương', pos: 'danh từ', examples: [
        { jp: '給料が上がってうれしい。', vi: 'Được tăng lương nên tôi rất vui.' },
        { jp: '給料日は毎月二十五日です。', vi: 'Ngày lĩnh lương là ngày 25 hằng tháng.' } ] },
      { word: '納得', reading: 'なっとく', meaning: 'hiểu và chấp nhận, thuyết phục', pos: 'danh từ・する', examples: [
        { jp: '上司の説明に納得できない。', vi: 'Tôi không thể chấp nhận lời giải thích của sếp.' },
        { jp: '納得するまで話し合おう。', vi: 'Hãy bàn bạc cho đến khi thông suốt.' } ] },
      { word: '効率', reading: 'こうりつ', meaning: 'hiệu suất, hiệu quả', pos: 'danh từ', examples: [
        { jp: '効率よく仕事を進めよう。', vi: 'Hãy tiến hành công việc một cách hiệu quả.' },
        { jp: 'この方法は効率が悪い。', vi: 'Cách này hiệu suất kém.' } ] },
      { word: '引き受ける', reading: 'ひきうける', meaning: 'nhận làm, đảm nhận', pos: 'động từ', examples: [
        { jp: '難しい仕事を引き受けてしまった。', vi: 'Tôi lỡ nhận một công việc khó.' },
        { jp: 'その役は私が引き受けます。', vi: 'Vai trò đó để tôi đảm nhận.' } ] },
      { word: '取り組む', reading: 'とりくむ', meaning: 'bắt tay vào, nỗ lực làm', pos: 'động từ', examples: [
        { jp: '新しい課題に取り組んでいる。', vi: 'Tôi đang bắt tay vào vấn đề mới.' },
        { jp: '環境問題に真剣に取り組むべきだ。', vi: 'Nên nghiêm túc giải quyết vấn đề môi trường.' } ] },
      { word: '見直す', reading: 'みなおす', meaning: 'xem lại, đánh giá lại', pos: 'động từ', examples: [
        { jp: '計画を一から見直す必要がある。', vi: 'Cần xem lại kế hoạch từ đầu.' },
        { jp: '提出する前にもう一度見直した。', vi: 'Tôi đã xem lại một lần nữa trước khi nộp.' } ] },
    ],
  },
  {
    id: 'society',
    title: 'Xã hội & Kinh tế',
    jp: '社会・経済',
    icon: '🏙️',
    color: '#ff7a59',
    words: [
      { word: '景気', reading: 'けいき', meaning: 'tình hình kinh tế', pos: 'danh từ', examples: [
        { jp: '景気が回復してきた。', vi: 'Kinh tế đã bắt đầu hồi phục.' },
        { jp: '景気が悪いと物が売れない。', vi: 'Kinh tế xấu thì hàng không bán được.' } ] },
      { word: '物価', reading: 'ぶっか', meaning: 'vật giá, giá cả', pos: 'danh từ', examples: [
        { jp: '物価が上がって生活が苦しい。', vi: 'Vật giá tăng nên cuộc sống khó khăn.' },
        { jp: '東京は物価が高い。', vi: 'Tokyo vật giá đắt đỏ.' } ] },
      { word: '税金', reading: 'ぜいきん', meaning: 'thuế', pos: 'danh từ', examples: [
        { jp: '税金を納めるのは国民の義務だ。', vi: 'Nộp thuế là nghĩa vụ của công dân.' },
        { jp: '税金の使い方に疑問がある。', vi: 'Tôi có thắc mắc về cách sử dụng tiền thuế.' } ] },
      { word: '失業', reading: 'しつぎょう', meaning: 'thất nghiệp', pos: 'danh từ・する', examples: [
        { jp: '失業率が高くなっている。', vi: 'Tỉ lệ thất nghiệp đang tăng.' },
        { jp: '会社が倒産して失業した。', vi: 'Công ty phá sản nên tôi thất nghiệp.' } ] },
      { word: '貿易', reading: 'ぼうえき', meaning: 'thương mại, ngoại thương', pos: 'danh từ', examples: [
        { jp: '日本はベトナムと貿易を行っている。', vi: 'Nhật Bản giao thương với Việt Nam.' },
        { jp: '貿易会社で働きたい。', vi: 'Tôi muốn làm ở công ty thương mại.' } ] },
      { word: '政府', reading: 'せいふ', meaning: 'chính phủ', pos: 'danh từ', examples: [
        { jp: '政府は新しい政策を発表した。', vi: 'Chính phủ đã công bố chính sách mới.' },
        { jp: '政府の対応が遅いと批判された。', vi: 'Chính phủ bị chỉ trích vì phản ứng chậm.' } ] },
      { word: '選挙', reading: 'せんきょ', meaning: 'bầu cử', pos: 'danh từ', examples: [
        { jp: '来月、市長選挙が行われる。', vi: 'Tháng sau sẽ diễn ra bầu cử thị trưởng.' },
        { jp: '若者の選挙への関心が低い。', vi: 'Giới trẻ ít quan tâm đến bầu cử.' } ] },
      { word: '高齢化', reading: 'こうれいか', meaning: 'già hóa (dân số)', pos: 'danh từ', examples: [
        { jp: '日本は高齢化が進んでいる。', vi: 'Nhật Bản đang già hóa dân số.' },
        { jp: '高齢化社会の問題を考える。', vi: 'Suy nghĩ về các vấn đề của xã hội già hóa.' } ] },
      { word: '格差', reading: 'かくさ', meaning: 'chênh lệch, khoảng cách', pos: 'danh từ', examples: [
        { jp: '貧富の格差が広がっている。', vi: 'Chênh lệch giàu nghèo đang gia tăng.' },
        { jp: '地域による格差をなくしたい。', vi: 'Muốn xóa bỏ chênh lệch giữa các vùng.' } ] },
      { word: '需要', reading: 'じゅよう', meaning: 'nhu cầu (cầu)', pos: 'danh từ', examples: [
        { jp: 'マスクの需要が急に増えた。', vi: 'Nhu cầu khẩu trang tăng đột ngột.' },
        { jp: '需要と供給のバランスが大切だ。', vi: 'Cân bằng cung cầu rất quan trọng.' } ] },
      { word: '供給', reading: 'きょうきゅう', meaning: 'cung cấp (cung)', pos: 'danh từ・する', examples: [
        { jp: '電力の供給が不足している。', vi: 'Nguồn cung điện đang thiếu.' },
        { jp: '水を安定して供給する。', vi: 'Cung cấp nước một cách ổn định.' } ] },
      { word: '消費', reading: 'しょうひ', meaning: 'tiêu dùng, tiêu thụ', pos: 'danh từ・する', examples: [
        { jp: '消費税が十パーセントになった。', vi: 'Thuế tiêu dùng đã lên 10 phần trăm.' },
        { jp: '若者の消費が減っている。', vi: 'Mức tiêu dùng của giới trẻ đang giảm.' } ] },
      { word: '企業', reading: 'きぎょう', meaning: 'doanh nghiệp', pos: 'danh từ', examples: [
        { jp: '多くの企業が海外に進出している。', vi: 'Nhiều doanh nghiệp đang mở rộng ra nước ngoài.' },
        { jp: '中小企業を支援する制度がある。', vi: 'Có chế độ hỗ trợ doanh nghiệp vừa và nhỏ.' } ] },
      { word: '影響', reading: 'えいきょう', meaning: 'ảnh hưởng', pos: 'danh từ・する', examples: [
        { jp: '円安が輸入に影響を与えている。', vi: 'Đồng yên yếu đang ảnh hưởng tới nhập khẩu.' },
        { jp: '台風の影響で電車が止まった。', vi: 'Tàu dừng do ảnh hưởng của bão.' } ] },
      { word: '対策', reading: 'たいさく', meaning: 'biện pháp, đối sách', pos: 'danh từ', examples: [
        { jp: '政府は少子化対策を進めている。', vi: 'Chính phủ đang thúc đẩy biện pháp chống giảm sinh.' },
        { jp: '地震対策として水を備えておく。', vi: 'Dự trữ nước như một biện pháp phòng động đất.' } ] },
    ],
  },
  {
    id: 'emotion',
    title: 'Cảm xúc & Tính cách',
    jp: '感情・性格',
    icon: '💭',
    color: '#c06cff',
    words: [
      { word: '悔しい', reading: 'くやしい', meaning: 'tiếc nuối, cay cú', pos: 'tính từ い', examples: [
        { jp: '試合に負けて悔しい。', vi: 'Thua trận nên tôi rất cay cú.' },
        { jp: '一点差で落ちたのが悔しい。', vi: 'Trượt chỉ vì một điểm nên tiếc lắm.' } ] },
      { word: '照れる', reading: 'てれる', meaning: 'ngượng ngùng, xấu hổ', pos: 'động từ', examples: [
        { jp: '褒められて照れてしまった。', vi: 'Được khen nên tôi ngượng.' },
        { jp: '照れないで、堂々と話して。', vi: 'Đừng ngượng, hãy nói một cách tự tin.' } ] },
      { word: '落ち込む', reading: 'おちこむ', meaning: 'chán nản, suy sụp', pos: 'động từ', examples: [
        { jp: '失敗して落ち込んでいる。', vi: 'Thất bại nên tôi đang chán nản.' },
        { jp: 'そんなに落ち込まないで。', vi: 'Đừng chán nản như vậy.' } ] },
      { word: '懐かしい', reading: 'なつかしい', meaning: 'hoài niệm, nhớ về', pos: 'tính từ い', examples: [
        { jp: '子どものころが懐かしい。', vi: 'Tôi nhớ hồi còn nhỏ.' },
        { jp: '懐かしい歌を聞いた。', vi: 'Tôi đã nghe một bài hát gợi nhiều kỷ niệm.' } ] },
      { word: '素直', reading: 'すなお', meaning: 'thật thà, ngoan ngoãn', pos: 'tính từ な', examples: [
        { jp: '彼は素直に謝った。', vi: 'Anh ấy thật lòng xin lỗi.' },
        { jp: '素直な子どもだ。', vi: 'Là một đứa trẻ ngoan.' } ] },
      { word: '頑固', reading: 'がんこ', meaning: 'bướng bỉnh, cứng đầu', pos: 'tính từ な', examples: [
        { jp: '祖父はとても頑固だ。', vi: 'Ông tôi rất bướng.' },
        { jp: '頑固な汚れが落ちない。', vi: 'Vết bẩn cứng đầu không sạch được.' } ] },
      { word: '慎重', reading: 'しんちょう', meaning: 'thận trọng', pos: 'tính từ な', examples: [
        { jp: '慎重に判断してください。', vi: 'Hãy phán đoán một cách thận trọng.' },
        { jp: '彼は何事にも慎重だ。', vi: 'Anh ấy thận trọng trong mọi việc.' } ] },
      { word: '積極的', reading: 'せっきょくてき', meaning: 'tích cực, chủ động', pos: 'tính từ な', examples: [
        { jp: '積極的に発言しよう。', vi: 'Hãy chủ động phát biểu.' },
        { jp: '積極的な態度が評価された。', vi: 'Thái độ tích cực được đánh giá cao.' } ] },
      { word: '消極的', reading: 'しょうきょくてき', meaning: 'tiêu cực, rụt rè', pos: 'tính từ な', examples: [
        { jp: '彼は何事にも消極的だ。', vi: 'Anh ấy rụt rè với mọi việc.' },
        { jp: '消極的な意見が多かった。', vi: 'Có nhiều ý kiến tiêu cực.' } ] },
      { word: '我慢', reading: 'がまん', meaning: 'chịu đựng, nhịn', pos: 'danh từ・する', examples: [
        { jp: '痛みを我慢した。', vi: 'Tôi đã chịu đựng cơn đau.' },
        { jp: 'もう我慢できない。', vi: 'Tôi không chịu nổi nữa.' } ] },
      { word: '感激', reading: 'かんげき', meaning: 'xúc động, cảm kích', pos: 'danh từ・する', examples: [
        { jp: '友人の言葉に感激した。', vi: 'Tôi xúc động trước lời của bạn.' },
        { jp: '感激して涙が出た。', vi: 'Xúc động đến rơi nước mắt.' } ] },
      { word: '不安', reading: 'ふあん', meaning: 'bất an, lo lắng', pos: 'tính từ な', examples: [
        { jp: '将来が不安だ。', vi: 'Tôi lo lắng về tương lai.' },
        { jp: '不安な気持ちを話した。', vi: 'Tôi đã kể về nỗi bất an của mình.' } ] },
      { word: '怒鳴る', reading: 'どなる', meaning: 'quát mắng, la hét', pos: 'động từ', examples: [
        { jp: '父に怒鳴られた。', vi: 'Tôi bị bố quát.' },
        { jp: '怒鳴っても解決しない。', vi: 'Quát mắng cũng không giải quyết được gì.' } ] },
      { word: 'あきれる', reading: 'あきれる', meaning: 'ngán ngẩm, sững sờ', pos: 'động từ', examples: [
        { jp: '彼の態度にあきれた。', vi: 'Tôi ngán ngẩm thái độ của anh ta.' },
        { jp: 'あきれて何も言えなかった。', vi: 'Ngán ngẩm đến mức không nói nên lời.' } ] },
      { word: '穏やか', reading: 'おだやか', meaning: 'ôn hòa, điềm đạm', pos: 'tính từ な', examples: [
        { jp: '彼女は穏やかな性格だ。', vi: 'Cô ấy có tính cách ôn hòa.' },
        { jp: '今日は海が穏やかだ。', vi: 'Hôm nay biển lặng.' } ] },
    ],
  },
  {
    id: 'health',
    title: 'Sức khỏe & Y tế',
    jp: '健康・医療',
    icon: '🏥',
    color: '#2fbf71',
    words: [
      { word: '診察', reading: 'しんさつ', meaning: 'khám bệnh', pos: 'danh từ・する', examples: [
        { jp: '医者に診察してもらった。', vi: 'Tôi được bác sĩ khám.' },
        { jp: '診察時間は午前九時からです。', vi: 'Giờ khám bắt đầu từ 9 giờ sáng.' } ] },
      { word: '症状', reading: 'しょうじょう', meaning: 'triệu chứng', pos: 'danh từ', examples: [
        { jp: 'どんな症状がありますか。', vi: 'Bạn có triệu chứng gì?' },
        { jp: '症状が軽いうちに病院へ行こう。', vi: 'Hãy đi bệnh viện khi triệu chứng còn nhẹ.' } ] },
      { word: '手術', reading: 'しゅじゅつ', meaning: 'phẫu thuật', pos: 'danh từ・する', examples: [
        { jp: '来週、手術を受ける。', vi: 'Tuần sau tôi sẽ phẫu thuật.' },
        { jp: '手術は無事に終わった。', vi: 'Ca phẫu thuật đã kết thúc an toàn.' } ] },
      { word: '回復', reading: 'かいふく', meaning: 'hồi phục', pos: 'danh từ・する', examples: [
        { jp: '体調はだいぶ回復した。', vi: 'Sức khỏe đã hồi phục khá nhiều.' },
        { jp: '回復まで時間がかかる。', vi: 'Cần thời gian để hồi phục.' } ] },
      { word: '予防', reading: 'よぼう', meaning: 'phòng ngừa', pos: 'danh từ・する', examples: [
        { jp: '手洗いは風邪の予防になる。', vi: 'Rửa tay giúp phòng cảm cúm.' },
        { jp: '予防接種を受けた。', vi: 'Tôi đã đi tiêm phòng.' } ] },
      { word: '栄養', reading: 'えいよう', meaning: 'dinh dưỡng', pos: 'danh từ', examples: [
        { jp: '栄養のバランスを考えて食べる。', vi: 'Ăn uống có cân nhắc cân bằng dinh dưỡng.' },
        { jp: '野菜は栄養が豊富だ。', vi: 'Rau có nhiều dinh dưỡng.' } ] },
      { word: '疲労', reading: 'ひろう', meaning: 'mệt mỏi, sự mệt', pos: 'danh từ', examples: [
        { jp: '疲労がたまっている。', vi: 'Mệt mỏi đang tích tụ.' },
        { jp: '疲労で倒れてしまった。', vi: 'Tôi gục ngã vì kiệt sức.' } ] },
      { word: '検査', reading: 'けんさ', meaning: 'kiểm tra, xét nghiệm', pos: 'danh từ・する', examples: [
        { jp: '血液検査を受けた。', vi: 'Tôi đã làm xét nghiệm máu.' },
        { jp: '検査の結果は来週出る。', vi: 'Kết quả xét nghiệm có vào tuần sau.' } ] },
      { word: '処方', reading: 'しょほう', meaning: 'kê đơn thuốc', pos: 'danh từ・する', examples: [
        { jp: '薬を処方してもらった。', vi: 'Tôi được kê thuốc.' },
        { jp: '処方箋を薬局に持っていく。', vi: 'Mang đơn thuốc đến hiệu thuốc.' } ] },
      { word: '睡眠', reading: 'すいみん', meaning: 'giấc ngủ', pos: 'danh từ', examples: [
        { jp: '十分な睡眠をとることが大切だ。', vi: 'Ngủ đủ giấc rất quan trọng.' },
        { jp: '睡眠不足で頭が痛い。', vi: 'Thiếu ngủ nên đau đầu.' } ] },
      { word: '肥満', reading: 'ひまん', meaning: 'béo phì', pos: 'danh từ', examples: [
        { jp: '肥満は病気の原因になる。', vi: 'Béo phì là nguyên nhân gây bệnh.' },
        { jp: '子どもの肥満が増えている。', vi: 'Béo phì ở trẻ em đang gia tăng.' } ] },
      { word: '血圧', reading: 'けつあつ', meaning: 'huyết áp', pos: 'danh từ', examples: [
        { jp: '血圧が高いと言われた。', vi: 'Tôi được bảo là huyết áp cao.' },
        { jp: '毎朝血圧を測っている。', vi: 'Mỗi sáng tôi đo huyết áp.' } ] },
      { word: '怪我', reading: 'けが', meaning: 'chấn thương, vết thương', pos: 'danh từ・する', examples: [
        { jp: '階段で転んで怪我をした。', vi: 'Tôi ngã cầu thang và bị thương.' },
        { jp: '怪我が治るまで休む。', vi: 'Nghỉ cho đến khi vết thương lành.' } ] },
      { word: '効く', reading: 'きく', meaning: 'có tác dụng, hiệu nghiệm', pos: 'động từ', examples: [
        { jp: 'この薬はよく効く。', vi: 'Thuốc này rất hiệu nghiệm.' },
        { jp: '頭痛に効く薬はありますか。', vi: 'Có thuốc nào trị đau đầu không?' } ] },
      { word: '悪化', reading: 'あっか', meaning: 'xấu đi, trở nặng', pos: 'danh từ・する', examples: [
        { jp: '病状が悪化した。', vi: 'Bệnh tình đã trở nặng.' },
        { jp: '放っておくと悪化するよ。', vi: 'Để yên thì sẽ nặng thêm đấy.' } ] },
    ],
  },
  {
    id: 'environment',
    title: 'Môi trường & Thiên nhiên',
    jp: '環境・自然',
    icon: '🌿',
    color: '#1fb3a5',
    words: [
      { word: '環境', reading: 'かんきょう', meaning: 'môi trường', pos: 'danh từ', examples: [
        { jp: '環境を守ることは大切だ。', vi: 'Bảo vệ môi trường rất quan trọng.' },
        { jp: '職場の環境を改善したい。', vi: 'Tôi muốn cải thiện môi trường làm việc.' } ] },
      { word: '汚染', reading: 'おせん', meaning: 'ô nhiễm', pos: 'danh từ・する', examples: [
        { jp: '川の汚染がひどい。', vi: 'Sông bị ô nhiễm nặng.' },
        { jp: '大気汚染が健康に影響する。', vi: 'Ô nhiễm không khí ảnh hưởng đến sức khỏe.' } ] },
      { word: '温暖化', reading: 'おんだんか', meaning: 'sự nóng lên (toàn cầu)', pos: 'danh từ', examples: [
        { jp: '地球温暖化が進んでいる。', vi: 'Trái đất đang nóng lên.' },
        { jp: '温暖化を止めるために何ができるか。', vi: 'Có thể làm gì để ngăn nóng lên toàn cầu?' } ] },
      { word: '災害', reading: 'さいがい', meaning: 'thảm họa, thiên tai', pos: 'danh từ', examples: [
        { jp: '自然災害に備える。', vi: 'Chuẩn bị cho thiên tai.' },
        { jp: '災害のとき、まず身の安全を守る。', vi: 'Khi có thảm họa, trước hết hãy bảo vệ bản thân.' } ] },
      { word: '地震', reading: 'じしん', meaning: 'động đất', pos: 'danh từ', examples: [
        { jp: '昨夜、大きな地震があった。', vi: 'Tối qua có một trận động đất lớn.' },
        { jp: '地震のとき机の下に隠れる。', vi: 'Khi có động đất, hãy trốn dưới bàn.' } ] },
      { word: '洪水', reading: 'こうずい', meaning: 'lũ lụt', pos: 'danh từ', examples: [
        { jp: '大雨で洪水が起きた。', vi: 'Mưa lớn gây ra lũ lụt.' },
        { jp: '洪水で家が流された。', vi: 'Nhà bị cuốn trôi vì lũ.' } ] },
      { word: '資源', reading: 'しげん', meaning: 'tài nguyên', pos: 'danh từ', examples: [
        { jp: '資源を無駄にしてはいけない。', vi: 'Không được lãng phí tài nguyên.' },
        { jp: '日本は資源が少ない国だ。', vi: 'Nhật Bản là nước ít tài nguyên.' } ] },
      { word: '節約', reading: 'せつやく', meaning: 'tiết kiệm', pos: 'danh từ・する', examples: [
        { jp: '電気を節約しよう。', vi: 'Hãy tiết kiệm điện.' },
        { jp: '節約のために自炊している。', vi: 'Tôi tự nấu ăn để tiết kiệm.' } ] },
      { word: '再利用', reading: 'さいりよう', meaning: 'tái sử dụng', pos: 'danh từ・する', examples: [
        { jp: '紙を再利用する。', vi: 'Tái sử dụng giấy.' },
        { jp: '再利用できるものは捨てないで。', vi: 'Đừng vứt những thứ có thể tái sử dụng.' } ] },
      { word: '絶滅', reading: 'ぜつめつ', meaning: 'tuyệt chủng', pos: 'danh từ・する', examples: [
        { jp: '多くの動物が絶滅の危機にある。', vi: 'Nhiều loài động vật có nguy cơ tuyệt chủng.' },
        { jp: 'この鳥はすでに絶滅した。', vi: 'Loài chim này đã tuyệt chủng.' } ] },
      { word: '気候', reading: 'きこう', meaning: 'khí hậu', pos: 'danh từ', examples: [
        { jp: 'この地域は気候が温暖だ。', vi: 'Vùng này có khí hậu ôn hòa.' },
        { jp: '気候の変化で農業が難しくなった。', vi: 'Biến đổi khí hậu khiến nông nghiệp khó khăn.' } ] },
      { word: '湿度', reading: 'しつど', meaning: 'độ ẩm', pos: 'danh từ', examples: [
        { jp: '今日は湿度が高い。', vi: 'Hôm nay độ ẩm cao.' },
        { jp: '湿度が低いと肌が乾燥する。', vi: 'Độ ẩm thấp thì da bị khô.' } ] },
      { word: '噴火', reading: 'ふんか', meaning: 'phun trào (núi lửa)', pos: 'danh từ・する', examples: [
        { jp: '火山が噴火した。', vi: 'Núi lửa đã phun trào.' },
        { jp: '噴火の影響で飛行機が欠航した。', vi: 'Máy bay bị hủy chuyến do núi lửa phun.' } ] },
      { word: '保護', reading: 'ほご', meaning: 'bảo vệ, bảo hộ', pos: 'danh từ・する', examples: [
        { jp: '自然を保護する活動に参加した。', vi: 'Tôi tham gia hoạt động bảo vệ thiên nhiên.' },
        { jp: '個人情報は保護されるべきだ。', vi: 'Thông tin cá nhân cần được bảo vệ.' } ] },
      { word: '廃棄', reading: 'はいき', meaning: 'vứt bỏ, thải bỏ', pos: 'danh từ・する', examples: [
        { jp: 'ごみの廃棄方法を守ってください。', vi: 'Hãy tuân thủ cách thải bỏ rác.' },
        { jp: '食品の廃棄を減らしたい。', vi: 'Muốn giảm lượng thực phẩm bỏ đi.' } ] },
    ],
  },
  {
    id: 'study',
    title: 'Học tập & Giáo dục',
    jp: '学習・教育',
    icon: '📚',
    color: '#f5a524',
    words: [
      { word: '教育', reading: 'きょういく', meaning: 'giáo dục', pos: 'danh từ・する', examples: [
        { jp: '子どもの教育に力を入れる。', vi: 'Dồn sức vào việc giáo dục con cái.' },
        { jp: '教育制度が変わった。', vi: 'Chế độ giáo dục đã thay đổi.' } ] },
      { word: '講義', reading: 'こうぎ', meaning: 'bài giảng (đại học)', pos: 'danh từ・する', examples: [
        { jp: '今日の講義は難しかった。', vi: 'Bài giảng hôm nay khó.' },
        { jp: '講義のノートを貸してくれない？', vi: 'Cho mình mượn vở ghi bài giảng được không?' } ] },
      { word: '専攻', reading: 'せんこう', meaning: 'chuyên ngành', pos: 'danh từ・する', examples: [
        { jp: '大学で経済学を専攻している。', vi: 'Tôi học chuyên ngành kinh tế ở đại học.' },
        { jp: '専攻は何ですか。', vi: 'Chuyên ngành của bạn là gì?' } ] },
      { word: '成績', reading: 'せいせき', meaning: 'thành tích, điểm số', pos: 'danh từ', examples: [
        { jp: '今学期は成績が上がった。', vi: 'Học kỳ này điểm số tăng lên.' },
        { jp: '成績が悪くて親に怒られた。', vi: 'Điểm kém nên bị bố mẹ mắng.' } ] },
      { word: '暗記', reading: 'あんき', meaning: 'học thuộc lòng', pos: 'danh từ・する', examples: [
        { jp: '毎日単語を暗記している。', vi: 'Mỗi ngày tôi học thuộc từ vựng.' },
        { jp: '暗記だけでは応用できない。', vi: 'Chỉ học thuộc thì không áp dụng được.' } ] },
      { word: '復習', reading: 'ふくしゅう', meaning: 'ôn tập', pos: 'danh từ・する', examples: [
        { jp: '毎日復習することが大事だ。', vi: 'Ôn tập mỗi ngày rất quan trọng.' },
        { jp: '試験の前に復習した。', vi: 'Tôi ôn tập trước kỳ thi.' } ] },
      { word: '予習', reading: 'よしゅう', meaning: 'chuẩn bị bài trước', pos: 'danh từ・する', examples: [
        { jp: '予習をしてから授業に出る。', vi: 'Chuẩn bị bài rồi mới đi học.' },
        { jp: '予習しておくと理解しやすい。', vi: 'Xem bài trước thì dễ hiểu hơn.' } ] },
      { word: '課題', reading: 'かだい', meaning: 'bài tập, vấn đề cần giải quyết', pos: 'danh từ', examples: [
        { jp: '課題を提出した。', vi: 'Tôi đã nộp bài tập.' },
        { jp: '今後の課題を整理しよう。', vi: 'Hãy sắp xếp lại các vấn đề sắp tới.' } ] },
      { word: '奨学金', reading: 'しょうがくきん', meaning: 'học bổng', pos: 'danh từ', examples: [
        { jp: '奨学金をもらって留学した。', vi: 'Tôi nhận học bổng và đi du học.' },
        { jp: '奨学金の申請をした。', vi: 'Tôi đã đăng ký học bổng.' } ] },
      { word: '論文', reading: 'ろんぶん', meaning: 'luận văn, bài báo khoa học', pos: 'danh từ', examples: [
        { jp: '卒業論文を書いている。', vi: 'Tôi đang viết luận văn tốt nghiệp.' },
        { jp: '論文の締め切りが近い。', vi: 'Hạn nộp luận văn sắp đến.' } ] },
      { word: '理解', reading: 'りかい', meaning: 'hiểu, lý giải', pos: 'danh từ・する', examples: [
        { jp: '内容がよく理解できた。', vi: 'Tôi hiểu rõ nội dung.' },
        { jp: '相手の立場を理解する。', vi: 'Hiểu lập trường của đối phương.' } ] },
      { word: '集中', reading: 'しゅうちゅう', meaning: 'tập trung', pos: 'danh từ・する', examples: [
        { jp: '勉強に集中できない。', vi: 'Tôi không thể tập trung học.' },
        { jp: '集中力を高める方法を知りたい。', vi: 'Muốn biết cách nâng cao sự tập trung.' } ] },
      { word: '身につける', reading: 'みにつける', meaning: 'nắm vững, thành thạo', pos: 'động từ', examples: [
        { jp: '日本語を身につけたい。', vi: 'Tôi muốn thành thạo tiếng Nhật.' },
        { jp: '技術を身につけるには時間がかかる。', vi: 'Cần thời gian để nắm vững kỹ thuật.' } ] },
      { word: '合格', reading: 'ごうかく', meaning: 'đỗ, đạt (kỳ thi)', pos: 'danh từ・する', examples: [
        { jp: 'N2に合格した。', vi: 'Tôi đã đỗ N2.' },
        { jp: '合格発表は三月だ。', vi: 'Công bố kết quả vào tháng 3.' } ] },
      { word: '挑戦', reading: 'ちょうせん', meaning: 'thử thách, thử sức', pos: 'danh từ・する', examples: [
        { jp: '今年はN2に挑戦する。', vi: 'Năm nay tôi thử sức với N2.' },
        { jp: '新しいことに挑戦したい。', vi: 'Muốn thử thách điều mới.' } ] },
    ],
  },
  {
    id: 'relationship',
    title: 'Quan hệ & Giao tiếp',
    jp: '人間関係',
    icon: '🤝',
    color: '#ff5c8a',
    words: [
      { word: '付き合う', reading: 'つきあう', meaning: 'hẹn hò, giao thiệp, đi cùng', pos: 'động từ', examples: [
        { jp: '彼と三年付き合っている。', vi: 'Tôi hẹn hò với anh ấy được 3 năm.' },
        { jp: '買い物に付き合ってくれない？', vi: 'Đi mua sắm cùng mình được không?' } ] },
      { word: '信頼', reading: 'しんらい', meaning: 'tin tưởng, tín nhiệm', pos: 'danh từ・する', examples: [
        { jp: '彼は信頼できる人だ。', vi: 'Anh ấy là người đáng tin cậy.' },
        { jp: '信頼関係を築くのは時間がかかる。', vi: 'Xây dựng lòng tin cần thời gian.' } ] },
      { word: '誤解', reading: 'ごかい', meaning: 'hiểu lầm', pos: 'danh từ・する', examples: [
        { jp: '誤解を解きたい。', vi: 'Tôi muốn giải tỏa hiểu lầm.' },
        { jp: '私の言葉が誤解を招いた。', vi: 'Lời tôi nói đã gây hiểu lầm.' } ] },
      { word: '遠慮', reading: 'えんりょ', meaning: 'ngại ngùng, khách sáo', pos: 'danh từ・する', examples: [
        { jp: '遠慮しないで食べてください。', vi: 'Đừng khách sáo, cứ ăn đi.' },
        { jp: '車内での通話はご遠慮ください。', vi: 'Xin vui lòng không gọi điện trong xe.' } ] },
      { word: '配慮', reading: 'はいりょ', meaning: 'sự quan tâm, chu đáo', pos: 'danh từ・する', examples: [
        { jp: '相手への配慮が足りない。', vi: 'Thiếu sự quan tâm đến đối phương.' },
        { jp: '高齢者に配慮した設計だ。', vi: 'Thiết kế có cân nhắc đến người cao tuổi.' } ] },
      { word: '礼儀', reading: 'れいぎ', meaning: 'lễ nghĩa, phép lịch sự', pos: 'danh từ', examples: [
        { jp: '彼は礼儀正しい人だ。', vi: 'Anh ấy là người lịch sự.' },
        { jp: '礼儀を知らない客が多い。', vi: 'Nhiều khách không biết phép lịch sự.' } ] },
      { word: '謝罪', reading: 'しゃざい', meaning: 'xin lỗi (trang trọng)', pos: 'danh từ・する', examples: [
        { jp: '会社が公式に謝罪した。', vi: 'Công ty đã chính thức xin lỗi.' },
        { jp: '謝罪の手紙を書いた。', vi: 'Tôi viết thư xin lỗi.' } ] },
      { word: '仲直り', reading: 'なかなおり', meaning: 'làm lành, hòa giải', pos: 'danh từ・する', examples: [
        { jp: '友達と仲直りした。', vi: 'Tôi đã làm lành với bạn.' },
        { jp: '早く仲直りしたほうがいい。', vi: 'Nên sớm làm lành thì hơn.' } ] },
      { word: '相談', reading: 'そうだん', meaning: 'bàn bạc, xin tư vấn', pos: 'danh từ・する', examples: [
        { jp: '進路について先生に相談した。', vi: 'Tôi hỏi ý kiến thầy về hướng đi tương lai.' },
        { jp: '相談に乗ってくれてありがとう。', vi: 'Cảm ơn vì đã lắng nghe và góp ý.' } ] },
      { word: '噂', reading: 'うわさ', meaning: 'tin đồn', pos: 'danh từ', examples: [
        { jp: '噂を信じないで。', vi: 'Đừng tin tin đồn.' },
        { jp: '彼が辞めるという噂がある。', vi: 'Có tin đồn anh ấy sẽ nghỉ việc.' } ] },
      { word: '親しい', reading: 'したしい', meaning: 'thân thiết', pos: 'tính từ い', examples: [
        { jp: '親しい友人が何人かいる。', vi: 'Tôi có vài người bạn thân.' },
        { jp: '親しい仲にも礼儀あり。', vi: 'Thân đến mấy cũng cần lễ nghĩa.' } ] },
      { word: '頼る', reading: 'たよる', meaning: 'nhờ cậy, dựa vào', pos: 'động từ', examples: [
        { jp: '困ったときは頼ってください。', vi: 'Khi gặp khó khăn hãy nhờ tôi.' },
        { jp: '親に頼らず生活したい。', vi: 'Muốn sống không phụ thuộc bố mẹ.' } ] },
      { word: '励ます', reading: 'はげます', meaning: 'động viên, khích lệ', pos: 'động từ', examples: [
        { jp: '落ち込んでいる友達を励ました。', vi: 'Tôi động viên người bạn đang chán nản.' },
        { jp: '励ましの言葉がうれしかった。', vi: 'Lời động viên khiến tôi vui.' } ] },
      { word: '接する', reading: 'せっする', meaning: 'tiếp xúc, đối xử', pos: 'động từ', examples: [
        { jp: 'お客様に丁寧に接する。', vi: 'Đối xử lịch sự với khách hàng.' },
        { jp: '子どもと接する仕事がしたい。', vi: 'Muốn làm công việc tiếp xúc với trẻ em.' } ] },
      { word: '気を遣う', reading: 'きをつかう', meaning: 'để ý, giữ ý, quan tâm', pos: 'cụm từ', examples: [
        { jp: '周りに気を遣いすぎて疲れる。', vi: 'Giữ ý với mọi người quá nên mệt.' },
        { jp: 'どうぞ気を遣わないでください。', vi: 'Xin đừng bận tâm.' } ] },
    ],
  },
  {
    id: 'life',
    title: 'Đời sống & Mua sắm',
    jp: '生活・買い物',
    icon: '🛒',
    color: '#ffb020',
    words: [
      { word: '家賃', reading: 'やちん', meaning: 'tiền thuê nhà', pos: 'danh từ', examples: [
        { jp: '家賃が高くて引っ越したい。', vi: 'Tiền nhà cao nên tôi muốn chuyển.' },
        { jp: '家賃は毎月末に払う。', vi: 'Tiền nhà trả vào cuối mỗi tháng.' } ] },
      { word: '引っ越し', reading: 'ひっこし', meaning: 'chuyển nhà', pos: 'danh từ・する', examples: [
        { jp: '来月、引っ越しする予定だ。', vi: 'Tháng sau tôi dự định chuyển nhà.' },
        { jp: '引っ越しの準備で忙しい。', vi: 'Bận rộn chuẩn bị chuyển nhà.' } ] },
      { word: '契約', reading: 'けいやく', meaning: 'hợp đồng, ký kết', pos: 'danh từ・する', examples: [
        { jp: '契約書にサインした。', vi: 'Tôi đã ký vào hợp đồng.' },
        { jp: '契約の内容をよく確認して。', vi: 'Hãy kiểm tra kỹ nội dung hợp đồng.' } ] },
      { word: '割引', reading: 'わりびき', meaning: 'giảm giá', pos: 'danh từ・する', examples: [
        { jp: '学生割引があります。', vi: 'Có giảm giá cho sinh viên.' },
        { jp: '二割引で買えた。', vi: 'Mua được với giá giảm 20%.' } ] },
      { word: '領収書', reading: 'りょうしゅうしょ', meaning: 'hóa đơn, biên lai', pos: 'danh từ', examples: [
        { jp: '領収書をください。', vi: 'Cho tôi xin hóa đơn.' },
        { jp: '領収書がないと返金できません。', vi: 'Không có biên lai thì không hoàn tiền được.' } ] },
      { word: '返品', reading: 'へんぴん', meaning: 'trả lại hàng', pos: 'danh từ・する', examples: [
        { jp: 'サイズが合わないので返品したい。', vi: 'Không vừa cỡ nên tôi muốn trả hàng.' },
        { jp: '返品は一週間以内にお願いします。', vi: 'Vui lòng trả hàng trong vòng một tuần.' } ] },
      { word: '家計', reading: 'かけい', meaning: 'chi tiêu gia đình', pos: 'danh từ', examples: [
        { jp: '家計を管理するのは私だ。', vi: 'Người quản lý chi tiêu trong nhà là tôi.' },
        { jp: '家計が苦しい。', vi: 'Kinh tế gia đình eo hẹp.' } ] },
      { word: '貯金', reading: 'ちょきん', meaning: 'tiết kiệm tiền', pos: 'danh từ・する', examples: [
        { jp: '毎月三万円貯金している。', vi: 'Mỗi tháng tôi tiết kiệm 30.000 yên.' },
        { jp: '貯金を崩して旅行に行った。', vi: 'Tôi rút tiền tiết kiệm đi du lịch.' } ] },
      { word: '無駄', reading: 'むだ', meaning: 'lãng phí, vô ích', pos: 'tính từ な', examples: [
        { jp: '無駄な買い物をやめよう。', vi: 'Hãy ngừng mua sắm lãng phí.' },
        { jp: '時間を無駄にしたくない。', vi: 'Tôi không muốn lãng phí thời gian.' } ] },
      { word: '日用品', reading: 'にちようひん', meaning: 'đồ dùng hằng ngày', pos: 'danh từ', examples: [
        { jp: '日用品を買いに行く。', vi: 'Đi mua đồ dùng hằng ngày.' },
        { jp: 'このスーパーは日用品が安い。', vi: 'Siêu thị này đồ dùng hằng ngày rẻ.' } ] },
      { word: '賞味期限', reading: 'しょうみきげん', meaning: 'hạn sử dụng', pos: 'danh từ', examples: [
        { jp: '賞味期限が切れている。', vi: 'Đã hết hạn sử dụng.' },
        { jp: '賞味期限を確認してから買う。', vi: 'Kiểm tra hạn sử dụng rồi mới mua.' } ] },
      { word: '宅配', reading: 'たくはい', meaning: 'giao hàng tận nhà', pos: 'danh từ・する', examples: [
        { jp: '宅配を頼んだ。', vi: 'Tôi đã gọi giao hàng tận nhà.' },
        { jp: '宅配便は明日届く。', vi: 'Hàng chuyển phát sẽ đến ngày mai.' } ] },
      { word: '手頃', reading: 'てごろ', meaning: 'phải chăng, vừa phải', pos: 'tính từ な', examples: [
        { jp: '手頃な値段のレストランを探している。', vi: 'Đang tìm nhà hàng giá phải chăng.' },
        { jp: 'このサイズは手頃だ。', vi: 'Cỡ này vừa phải.' } ] },
      { word: '揃える', reading: 'そろえる', meaning: 'sắm đủ, sắp xếp ngay ngắn', pos: 'động từ', examples: [
        { jp: '新しい家具を揃えた。', vi: 'Tôi đã sắm đủ đồ nội thất mới.' },
        { jp: '靴をきちんと揃えて。', vi: 'Hãy xếp giày ngay ngắn.' } ] },
      { word: '支払う', reading: 'しはらう', meaning: 'thanh toán, chi trả', pos: 'động từ', examples: [
        { jp: 'カードで支払う。', vi: 'Thanh toán bằng thẻ.' },
        { jp: '料金は前もって支払ってください。', vi: 'Vui lòng thanh toán phí trước.' } ] },
    ],
  },
  {
    id: 'travel',
    title: 'Giao thông & Du lịch',
    jp: '交通・旅行',
    icon: '🚆',
    color: '#3dbbf0',
    words: [
      { word: '渋滞', reading: 'じゅうたい', meaning: 'kẹt xe, tắc đường', pos: 'danh từ・する', examples: [
        { jp: '道路が渋滞している。', vi: 'Đường đang kẹt xe.' },
        { jp: '渋滞に巻き込まれて遅れた。', vi: 'Bị kẹt xe nên đến muộn.' } ] },
      { word: '乗り換え', reading: 'のりかえ', meaning: 'chuyển tàu/xe', pos: 'danh từ・する', examples: [
        { jp: '新宿で乗り換えてください。', vi: 'Hãy chuyển tàu ở Shinjuku.' },
        { jp: '乗り換えが多くて面倒だ。', vi: 'Phải đổi tàu nhiều nên phiền.' } ] },
      { word: '運賃', reading: 'うんちん', meaning: 'tiền vé, cước phí', pos: 'danh từ', examples: [
        { jp: '運賃が値上がりした。', vi: 'Giá vé đã tăng.' },
        { jp: '子どもの運賃は半額です。', vi: 'Vé trẻ em giảm nửa giá.' } ] },
      { word: '満員', reading: 'まんいん', meaning: 'đầy người, hết chỗ', pos: 'danh từ', examples: [
        { jp: '満員電車は本当に大変だ。', vi: 'Tàu chật ních người thật mệt.' },
        { jp: '会場は満員だった。', vi: 'Hội trường kín chỗ.' } ] },
      { word: '遅延', reading: 'ちえん', meaning: 'trễ, chậm (tàu, chuyến bay)', pos: 'danh từ・する', examples: [
        { jp: '事故で電車が遅延している。', vi: 'Tàu bị chậm do tai nạn.' },
        { jp: '遅延証明書をもらった。', vi: 'Tôi nhận giấy chứng nhận tàu trễ.' } ] },
      { word: '観光', reading: 'かんこう', meaning: 'tham quan, du lịch', pos: 'danh từ・する', examples: [
        { jp: '京都を観光した。', vi: 'Tôi đã tham quan Kyoto.' },
        { jp: '観光客が増えている。', vi: 'Khách du lịch đang tăng.' } ] },
      { word: '宿泊', reading: 'しゅくはく', meaning: 'lưu trú, nghỉ lại', pos: 'danh từ・する', examples: [
        { jp: '駅前のホテルに宿泊する。', vi: 'Tôi nghỉ ở khách sạn trước ga.' },
        { jp: '宿泊料金に朝食は含まれますか。', vi: 'Giá phòng có bao gồm bữa sáng không?' } ] },
      { word: '日帰り', reading: 'ひがえり', meaning: 'đi về trong ngày', pos: 'danh từ', examples: [
        { jp: '日帰りで温泉に行った。', vi: 'Tôi đi suối nước nóng về trong ngày.' },
        { jp: '日帰り旅行なら荷物が少なくて済む。', vi: 'Đi về trong ngày thì ít hành lý.' } ] },
      { word: '出発', reading: 'しゅっぱつ', meaning: 'xuất phát, khởi hành', pos: 'danh từ・する', examples: [
        { jp: '朝六時に出発する。', vi: 'Khởi hành lúc 6 giờ sáng.' },
        { jp: '出発の時間が変更になった。', vi: 'Giờ khởi hành đã thay đổi.' } ] },
      { word: '到着', reading: 'とうちゃく', meaning: 'đến nơi', pos: 'danh từ・する', examples: [
        { jp: '予定より早く到着した。', vi: 'Đến sớm hơn dự kiến.' },
        { jp: '到着したら連絡します。', vi: 'Đến nơi tôi sẽ liên lạc.' } ] },
      { word: '通勤', reading: 'つうきん', meaning: 'đi làm (hằng ngày)', pos: 'danh từ・する', examples: [
        { jp: '通勤に一時間かかる。', vi: 'Đi làm mất một tiếng.' },
        { jp: '自転車で通勤している。', vi: 'Tôi đi làm bằng xe đạp.' } ] },
      { word: '免許', reading: 'めんきょ', meaning: 'bằng lái, giấy phép', pos: 'danh từ', examples: [
        { jp: '運転免許を取った。', vi: 'Tôi đã lấy bằng lái xe.' },
        { jp: '免許の更新に行く。', vi: 'Đi gia hạn bằng lái.' } ] },
      { word: '迷う', reading: 'まよう', meaning: 'lạc đường, phân vân', pos: 'động từ', examples: [
        { jp: '道に迷ってしまった。', vi: 'Tôi bị lạc đường.' },
        { jp: 'どちらを買うか迷っている。', vi: 'Tôi đang phân vân mua cái nào.' } ] },
      { word: '名所', reading: 'めいしょ', meaning: 'danh lam thắng cảnh', pos: 'danh từ', examples: [
        { jp: '京都の名所を巡った。', vi: 'Tôi đi quanh các danh thắng ở Kyoto.' },
        { jp: 'ここは桜の名所として有名だ。', vi: 'Nơi này nổi tiếng là điểm ngắm hoa anh đào.' } ] },
      { word: '手続き', reading: 'てつづき', meaning: 'thủ tục', pos: 'danh từ・する', examples: [
        { jp: '搭乗手続きを済ませた。', vi: 'Tôi đã làm xong thủ tục lên máy bay.' },
        { jp: 'ビザの手続きは面倒だ。', vi: 'Thủ tục visa phiền phức.' } ] },
    ],
  },
  {
    id: 'tech',
    title: 'Khoa học & Công nghệ',
    jp: '科学・技術',
    icon: '🔬',
    color: '#7c6cff',
    words: [
      { word: '技術', reading: 'ぎじゅつ', meaning: 'kỹ thuật, công nghệ', pos: 'danh từ', examples: [
        { jp: '技術が急速に進歩した。', vi: 'Công nghệ đã tiến bộ nhanh chóng.' },
        { jp: '技術者として働いている。', vi: 'Tôi làm việc với tư cách kỹ sư.' } ] },
      { word: '発明', reading: 'はつめい', meaning: 'phát minh', pos: 'danh từ・する', examples: [
        { jp: 'ベルが電話を発明した。', vi: 'Bell đã phát minh ra điện thoại.' },
        { jp: '新しい発明が生活を変えた。', vi: 'Phát minh mới đã thay đổi cuộc sống.' } ] },
      { word: '開発', reading: 'かいはつ', meaning: 'phát triển, khai thác', pos: 'danh từ・する', examples: [
        { jp: '新製品を開発する。', vi: 'Phát triển sản phẩm mới.' },
        { jp: 'アプリの開発に半年かかった。', vi: 'Phát triển ứng dụng mất nửa năm.' } ] },
      { word: '実験', reading: 'じっけん', meaning: 'thí nghiệm', pos: 'danh từ・する', examples: [
        { jp: '実験に成功した。', vi: 'Thí nghiệm đã thành công.' },
        { jp: '実験の結果をまとめる。', vi: 'Tổng hợp kết quả thí nghiệm.' } ] },
      { word: '人工知能', reading: 'じんこうちのう', meaning: 'trí tuệ nhân tạo (AI)', pos: 'danh từ', examples: [
        { jp: '人工知能が注目されている。', vi: 'Trí tuệ nhân tạo đang được chú ý.' },
        { jp: '人工知能が仕事を奪うという心配がある。', vi: 'Có lo ngại AI sẽ cướp việc làm.' } ] },
      { word: '情報', reading: 'じょうほう', meaning: 'thông tin', pos: 'danh từ', examples: [
        { jp: 'インターネットで情報を集める。', vi: 'Thu thập thông tin trên mạng.' },
        { jp: '正しい情報かどうか確かめよう。', vi: 'Hãy xác minh thông tin có đúng không.' } ] },
      { word: '通信', reading: 'つうしん', meaning: 'truyền thông, liên lạc', pos: 'danh từ・する', examples: [
        { jp: '通信速度が速くなった。', vi: 'Tốc độ truyền tải đã nhanh hơn.' },
        { jp: '山の中では通信ができない。', vi: 'Trong núi không liên lạc được.' } ] },
      { word: '操作', reading: 'そうさ', meaning: 'thao tác, vận hành', pos: 'danh từ・する', examples: [
        { jp: 'このアプリは操作が簡単だ。', vi: 'Ứng dụng này thao tác đơn giản.' },
        { jp: '機械の操作を覚えた。', vi: 'Tôi đã học cách vận hành máy.' } ] },
      { word: '故障', reading: 'こしょう', meaning: 'hỏng hóc', pos: 'danh từ・する', examples: [
        { jp: 'パソコンが故障した。', vi: 'Máy tính bị hỏng.' },
        { jp: 'エレベーターは故障中です。', vi: 'Thang máy đang hỏng.' } ] },
      { word: '機能', reading: 'きのう', meaning: 'chức năng', pos: 'danh từ・する', examples: [
        { jp: '新しい機能が追加された。', vi: 'Chức năng mới đã được thêm vào.' },
        { jp: 'この機能はあまり使わない。', vi: 'Chức năng này tôi ít dùng.' } ] },
      { word: '普及', reading: 'ふきゅう', meaning: 'phổ biến, phổ cập', pos: 'danh từ・する', examples: [
        { jp: 'スマホが広く普及した。', vi: 'Smartphone đã phổ biến rộng rãi.' },
        { jp: '電気自動車の普及が進む。', vi: 'Xe điện ngày càng phổ biến.' } ] },
      { word: '性能', reading: 'せいのう', meaning: 'hiệu năng, tính năng', pos: 'danh từ', examples: [
        { jp: 'このカメラは性能がいい。', vi: 'Máy ảnh này hiệu năng tốt.' },
        { jp: '性能と価格を比べて選ぶ。', vi: 'So sánh hiệu năng và giá rồi chọn.' } ] },
      { word: '分析', reading: 'ぶんせき', meaning: 'phân tích', pos: 'danh từ・する', examples: [
        { jp: 'データを分析する。', vi: 'Phân tích dữ liệu.' },
        { jp: '原因を分析して対策を立てる。', vi: 'Phân tích nguyên nhân và lập đối sách.' } ] },
      { word: '発展', reading: 'はってん', meaning: 'phát triển (xã hội, kinh tế)', pos: 'danh từ・する', examples: [
        { jp: '科学が発展した。', vi: 'Khoa học đã phát triển.' },
        { jp: '会社のさらなる発展を願っています。', vi: 'Chúc công ty ngày càng phát triển.' } ] },
      { word: '測定', reading: 'そくてい', meaning: 'đo đạc', pos: 'danh từ・する', examples: [
        { jp: '温度を測定する。', vi: 'Đo nhiệt độ.' },
        { jp: '測定の結果を記録した。', vi: 'Tôi đã ghi lại kết quả đo.' } ] },
    ],
  },
  {
    id: 'adverb',
    title: 'Phó từ & Cách diễn đạt',
    jp: '副詞・表現',
    icon: '✨',
    color: '#e05bb4',
    words: [
      { word: 'さっそく', reading: 'さっそく', meaning: 'ngay lập tức, liền', pos: 'phó từ', examples: [
        { jp: '新しい辞書をさっそく使ってみた。', vi: 'Tôi dùng thử ngay cuốn từ điển mới.' },
        { jp: 'さっそくですが、本題に入ります。', vi: 'Xin đi thẳng vào vấn đề chính.' } ] },
      { word: 'いよいよ', reading: 'いよいよ', meaning: 'cuối cùng cũng, sắp đến', pos: 'phó từ', examples: [
        { jp: 'いよいよ試験の日だ。', vi: 'Cuối cùng cũng đến ngày thi.' },
        { jp: 'いよいよ出発の時間が近づいた。', vi: 'Giờ xuất phát sắp đến rồi.' } ] },
      { word: 'せっかく', reading: 'せっかく', meaning: 'cất công, mất công', pos: 'phó từ', examples: [
        { jp: 'せっかく来たのに店が休みだった。', vi: 'Cất công đến mà cửa hàng lại nghỉ.' },
        { jp: 'せっかくのチャンスを逃さないで。', vi: 'Đừng bỏ lỡ cơ hội hiếm có.' } ] },
      { word: '相変わらず', reading: 'あいかわらず', meaning: 'vẫn như cũ', pos: 'phó từ', examples: [
        { jp: '相変わらず元気だね。', vi: 'Vẫn khỏe như mọi khi nhỉ.' },
        { jp: '彼は相変わらず忙しそうだ。', vi: 'Anh ấy vẫn bận rộn như xưa.' } ] },
      { word: '思わず', reading: 'おもわず', meaning: 'bất giác, vô thức', pos: 'phó từ', examples: [
        { jp: '思わず笑ってしまった。', vi: 'Tôi bất giác bật cười.' },
        { jp: '思わず大きな声を出した。', vi: 'Tôi vô tình kêu to.' } ] },
      { word: '次第に', reading: 'しだいに', meaning: 'dần dần', pos: 'phó từ', examples: [
        { jp: '空が次第に暗くなった。', vi: 'Bầu trời dần tối lại.' },
        { jp: '次第に日本の生活に慣れてきた。', vi: 'Tôi dần quen với cuộc sống ở Nhật.' } ] },
      { word: '案外', reading: 'あんがい', meaning: 'ngoài dự đoán, không ngờ', pos: 'phó từ', examples: [
        { jp: '試験は案外簡単だった。', vi: 'Kỳ thi không ngờ lại dễ.' },
        { jp: '案外早く着いた。', vi: 'Đến sớm hơn tưởng tượng.' } ] },
      { word: '一斉に', reading: 'いっせいに', meaning: 'đồng loạt', pos: 'phó từ', examples: [
        { jp: '学生たちが一斉に立ち上がった。', vi: 'Các sinh viên đồng loạt đứng dậy.' },
        { jp: '桜が一斉に咲いた。', vi: 'Hoa anh đào nở đồng loạt.' } ] },
      { word: 'とっくに', reading: 'とっくに', meaning: 'đã từ lâu rồi', pos: 'phó từ', examples: [
        { jp: '彼はとっくに帰ったよ。', vi: 'Anh ấy về từ lâu rồi.' },
        { jp: '宿題はとっくに終わった。', vi: 'Bài tập tôi làm xong từ lâu rồi.' } ] },
      { word: 'めったに', reading: 'めったに', meaning: 'hiếm khi (đi với phủ định)', pos: 'phó từ', examples: [
        { jp: 'めったに外食しない。', vi: 'Tôi hiếm khi ăn ngoài.' },
        { jp: 'こんなチャンスはめったにない。', vi: 'Cơ hội như thế này hiếm lắm.' } ] },
      { word: '大幅に', reading: 'おおはばに', meaning: 'đáng kể, mạnh', pos: 'phó từ', examples: [
        { jp: '売り上げが大幅に増えた。', vi: 'Doanh thu tăng đáng kể.' },
        { jp: '予定が大幅に変更された。', vi: 'Kế hoạch bị thay đổi lớn.' } ] },
      { word: '改めて', reading: 'あらためて', meaning: 'một lần nữa, lại', pos: 'phó từ', examples: [
        { jp: '改めてお礼を申し上げます。', vi: 'Xin được cảm ơn một lần nữa.' },
        { jp: '改めて連絡します。', vi: 'Tôi sẽ liên lạc lại sau.' } ] },
      { word: '常に', reading: 'つねに', meaning: 'luôn luôn', pos: 'phó từ', examples: [
        { jp: '彼は常に努力している。', vi: 'Anh ấy luôn luôn nỗ lực.' },
        { jp: '常に安全を確認してください。', vi: 'Hãy luôn kiểm tra an toàn.' } ] },
      { word: '徐々に', reading: 'じょじょに', meaning: 'từ từ, từng chút', pos: 'phó từ', examples: [
        { jp: '徐々に仕事に慣れてきた。', vi: 'Tôi dần dần quen việc.' },
        { jp: '気温が徐々に下がっている。', vi: 'Nhiệt độ đang giảm dần.' } ] },
      { word: '要するに', reading: 'ようするに', meaning: 'tóm lại, nói ngắn gọn', pos: 'phó từ', examples: [
        { jp: '要するに、無理だということだ。', vi: 'Tóm lại là không thể được.' },
        { jp: '要するに何が言いたいの？', vi: 'Tóm lại bạn muốn nói gì?' } ] },
    ],
  },
  {
    id: 'culture',
    title: 'Văn hóa & Sở thích',
    jp: '文化・趣味',
    icon: '🎎',
    color: '#ff6b6b',
    words: [
      { word: '伝統', reading: 'でんとう', meaning: 'truyền thống', pos: 'danh từ', examples: [
        { jp: '伝統を守ることは大切だ。', vi: 'Giữ gìn truyền thống rất quan trọng.' },
        { jp: '伝統的な建物が残っている。', vi: 'Vẫn còn những tòa nhà truyền thống.' } ] },
      { word: '行事', reading: 'ぎょうじ', meaning: 'sự kiện, nghi lễ (định kỳ)', pos: 'danh từ', examples: [
        { jp: '学校の行事に参加した。', vi: 'Tôi tham gia sự kiện của trường.' },
        { jp: '日本には季節ごとの行事がある。', vi: 'Nhật Bản có các sự kiện theo mùa.' } ] },
      { word: '芸術', reading: 'げいじゅつ', meaning: 'nghệ thuật', pos: 'danh từ', examples: [
        { jp: '芸術に興味がある。', vi: 'Tôi quan tâm đến nghệ thuật.' },
        { jp: '秋は芸術の季節だ。', vi: 'Mùa thu là mùa của nghệ thuật.' } ] },
      { word: '鑑賞', reading: 'かんしょう', meaning: 'thưởng thức (nghệ thuật)', pos: 'danh từ・する', examples: [
        { jp: '週末は映画を鑑賞する。', vi: 'Cuối tuần tôi xem phim.' },
        { jp: '絵画鑑賞が趣味だ。', vi: 'Sở thích của tôi là thưởng tranh.' } ] },
      { word: '演奏', reading: 'えんそう', meaning: 'biểu diễn (nhạc cụ)', pos: 'danh từ・する', examples: [
        { jp: 'ピアノを演奏する。', vi: 'Chơi đàn piano.' },
        { jp: '演奏会に招待された。', vi: 'Tôi được mời đến buổi hòa nhạc.' } ] },
      { word: '作品', reading: 'さくひん', meaning: 'tác phẩm', pos: 'danh từ', examples: [
        { jp: '学生の作品を展示する。', vi: 'Trưng bày tác phẩm của sinh viên.' },
        { jp: 'この作品は有名な作家が書いた。', vi: 'Tác phẩm này do một nhà văn nổi tiếng viết.' } ] },
      { word: '祭り', reading: 'まつり', meaning: 'lễ hội', pos: 'danh từ', examples: [
        { jp: '夏祭りに浴衣で行った。', vi: 'Tôi mặc yukata đi lễ hội mùa hè.' },
        { jp: '祭りの準備で町がにぎやかだ。', vi: 'Phố xá nhộn nhịp chuẩn bị lễ hội.' } ] },
      { word: '習慣', reading: 'しゅうかん', meaning: 'thói quen, tập quán', pos: 'danh từ', examples: [
        { jp: '日本の習慣を学ぶ。', vi: 'Học tập quán của Nhật.' },
        { jp: '早起きの習慣をつけたい。', vi: 'Muốn tạo thói quen dậy sớm.' } ] },
      { word: '流行', reading: 'りゅうこう', meaning: 'trào lưu, thịnh hành', pos: 'danh từ・する', examples: [
        { jp: '彼女は流行に敏感だ。', vi: 'Cô ấy nhạy với xu hướng.' },
        { jp: '今年はこの色が流行している。', vi: 'Năm nay màu này đang thịnh hành.' } ] },
      { word: '撮影', reading: 'さつえい', meaning: 'quay phim, chụp ảnh', pos: 'danh từ・する', examples: [
        { jp: '館内は撮影禁止です。', vi: 'Trong nhà cấm chụp ảnh.' },
        { jp: '映画の撮影が行われている。', vi: 'Đang quay phim.' } ] },
      { word: '熱中', reading: 'ねっちゅう', meaning: 'say mê, mải mê', pos: 'danh từ・する', examples: [
        { jp: '弟はゲームに熱中している。', vi: 'Em trai tôi đang mải mê chơi game.' },
        { jp: '熱中できる趣味を見つけたい。', vi: 'Muốn tìm sở thích để say mê.' } ] },
      { word: '収集', reading: 'しゅうしゅう', meaning: 'sưu tầm, thu thập', pos: 'danh từ・する', examples: [
        { jp: '切手を収集している。', vi: 'Tôi sưu tầm tem.' },
        { jp: 'データを収集して分析する。', vi: 'Thu thập dữ liệu rồi phân tích.' } ] },
      { word: '歴史', reading: 'れきし', meaning: 'lịch sử', pos: 'danh từ', examples: [
        { jp: '日本の歴史を学んでいる。', vi: 'Tôi đang học lịch sử Nhật Bản.' },
        { jp: '歴史のある町を歩く。', vi: 'Đi dạo trong thị trấn có bề dày lịch sử.' } ] },
      { word: '宗教', reading: 'しゅうきょう', meaning: 'tôn giáo', pos: 'danh từ', examples: [
        { jp: '宗教の自由は憲法で守られている。', vi: 'Tự do tôn giáo được hiến pháp bảo vệ.' },
        { jp: '宗教によって食べ物の制限がある。', vi: 'Tùy tôn giáo mà có hạn chế về đồ ăn.' } ] },
      { word: '展覧会', reading: 'てんらんかい', meaning: 'triển lãm', pos: 'danh từ', examples: [
        { jp: '展覧会を見に行った。', vi: 'Tôi đã đi xem triển lãm.' },
        { jp: '展覧会は来週まで開かれている。', vi: 'Triển lãm mở đến tuần sau.' } ] },
    ],
  },
]

