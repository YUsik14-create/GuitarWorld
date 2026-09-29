import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Guitar, GuitarType, PickupConfig, BridgeType, PlayerLevel } from '../types/guitar';
import { Shield, Plus, Trash2, CheckCircle2, ArrowLeft } from 'lucide-react';

export const AdminPanelModal: React.FC = () => {
  const { allGuitars, addCustomGuitar, deleteCustomGuitar, navigateTo } = useApp();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Fender');
  const [type, setType] = useState<GuitarType>('electric');
  const [price, setPrice] = useState(999);
  const [desc, setDesc] = useState('');
  const [bodyWood, setBodyWood] = useState('Ольха');
  const [pickups, setPickups] = useState('2x Humbuckers');
  const [pickupConfig, setPickupConfig] = useState<PickupConfig>('HH');
  const [level, setLevel] = useState<PlayerLevel>('Любитель');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAddGuitar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newGuitar: Guitar = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      brand,
      yearCreated: new Date().getFullYear(),
      type,
      priceEstimateUSD: Number(price),
      priceNote: 'Пользовательская модель из панели администратора.',
      image: '/src/assets/images/hero_electric_guitar_1790620416632.jpg',
      description: desc || 'Кастомный инструмент, созданный в демонстрационной панели администратора GuitarWorld.',
      specs: {
        bodyWood,
        neckWood: 'Клен (Maple)',
        fretboardWood: 'Палисандр (Rosewood)',
        fretsCount: 22,
        scaleLength: '25.5" (648 мм)',
        scaleLengthInches: 25.5,
        nutWidth: '42.8 мм',
        fretboardRadius: '9.5"',
        bridge: 'Fixed (Hardtail)',
        tuners: 'Die-cast Sealed',
        pickups,
        pickupConfig,
        controls: '1 Volume, 1 Tone',
        electronics: 'Passive',
        weightKg: 3.5,
        originCountry: 'Пользовательская сборка',
      },
      soundProfile: {
        brightness: 75,
        warmth: 75,
        aggression: 70,
        clarity: 80,
        density: 80,
        sustain: 80,
      },
      soundDescription: 'Сбалансированное и яркое звучание с хорошей динамикой.',
      pros: ['Кастомный дизайн', 'Полная интеграция в каталог'],
      features: ['Добавлено через панель администратора'],
      suitableGenres: ['Rock', 'Blues', 'Metal'],
      playerLevel: level,
      history: 'Модель добавлена пользователем в локальную базу данных.',
      famousArtists: ['Пользователь GuitarWorld'],
      similarModelIds: ['fender-stratocaster'],
      rating: 5.0,
    };

    addCustomGuitar(newGuitar);
    setSuccessMsg(`Гитара "${name}" успешно добавлена в каталог!`);
    setName('');
    setDesc('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const customGuitars = allGuitars.filter((g) => g.id.startsWith('custom-'));

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Локальная панель администратора
            </h2>
            <p className="text-xs text-zinc-400">
              Управление базой данных инструментов без перезагрузки интерфейса (сохраняется в LocalStorage).
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('guitars')}
          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться к сайту</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add Model Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6">
        <h3 className="font-bold text-lg text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-amber-500" />
          <span>Добавить новый инструмент в каталог</span>
        </h3>

        <form onSubmit={handleAddGuitar} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Название модели *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="напр. Solar A1.6 Custom"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Бренд</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Тип инструмента</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200"
              >
                <option value="electric">Электрогитара</option>
                <option value="acoustic">Акустическая</option>
                <option value="classical">Классическая</option>
                <option value="bass">Бас-гитара</option>
                <option value="7-string">7-струнная</option>
                <option value="8-string">8-струнная</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Ориентировочная цена ($ USD)</label>
              <input
                type="number"
                min={50}
                max={20000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Конфигурация звукоснимателей</label>
              <select
                value={pickupConfig}
                onChange={(e) => setPickupConfig(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200"
              >
                <option value="HH">HH (Два хамбакера)</option>
                <option value="SSS">SSS (Три сингла)</option>
                <option value="HSS">HSS (Хамбакер + 2 сингла)</option>
                <option value="HSH">HSH</option>
                <option value="SS">SS (Телекастер)</option>
                <option value="P90">P90</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Уровень игрока</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200"
              >
                <option value="Новичок">Новичок</option>
                <option value="Любитель">Любитель</option>
                <option value="Продвинутый">Продвинутый</option>
                <option value="Профессионал">Профессионал</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">Краткое описание инструмента</label>
            <textarea
              rows={2}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Опишите особенности звука, дерева и конструкции..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Сохранить в каталог
          </button>
        </form>
      </div>

      {/* List of Custom Added Guitars */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-white">
          Пользовательские инструменты в текущей сессии ({customGuitars.length})
        </h3>
        {customGuitars.length === 0 ? (
          <p className="text-xs text-zinc-500">Пока не добавлено ни одной пользовательской модели.</p>
        ) : (
          <div className="space-y-2">
            {customGuitars.map((cg) => (
              <div
                key={cg.id}
                className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm text-white">{cg.name}</h4>
                  <p className="text-xs text-zinc-400">
                    {cg.brand} · ${cg.priceEstimateUSD} · {cg.specs.pickupConfig}
                  </p>
                </div>
                <button
                  onClick={() => deleteCustomGuitar(cg.id)}
                  className="p-2 text-zinc-500 hover:text-rose-400 transition-colors"
                  title="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
