import React, { useState, useMemo } from 'react';
import {
  CheckSquare,
  Palette,
  Sliders,
  Plus,
  Trash2,
  Check,
  Copy,
  RefreshCw
} from 'lucide-react';

interface Task {
  id: number;
  text: string;
  category: string;
  completed: boolean;
}

export const Playground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'calculator' | 'palette'>('tasks');

  // Task Hub State
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Initialize React 19 + Vite project', category: 'Setup', completed: true },
    { id: 2, text: 'Configure TypeScript & strict interfaces', category: 'TypeScript', completed: true },
    { id: 3, text: 'Build interactive functional components', category: 'Architecture', completed: false },
    { id: 4, text: 'Test production bundle with Rollup', category: 'DevOps', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), text: newTaskText.trim(), category: 'Feature', completed: false }
    ]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Unit Converter / Calculator State
  const [priceInput, setPriceInput] = useState<number>(100);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [taxRate, setTaxRate] = useState<number>(8.5);

  const calculations = useMemo(() => {
    const discountAmount = (priceInput * discountPercent) / 100;
    const discountedPrice = priceInput - discountAmount;
    const taxAmount = (discountedPrice * taxRate) / 100;
    const finalTotal = discountedPrice + taxAmount;
    return { discountAmount, discountedPrice, taxAmount, finalTotal };
  }, [priceInput, discountPercent, taxRate]);

  // Dynamic Palette State
  const [colors, setColors] = useState([
    '#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'
  ]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const generateRandomPalette = () => {
    const letters = '0123456789ABCDEF';
    const newColors = Array.from({ length: 5 }, () => {
      let col = '#';
      for (let i = 0; i < 6; i++) {
        col += letters[Math.floor(Math.random() * 16)];
      }
      return col;
    });
    setColors(newColors);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="playground" className="showcase-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Live Demos</div>
          <h2 className="section-title">Interactive React Hooks Playground</h2>
          <p className="section-description">
            Experience real-time reactive state updates, memoized calculations, and interactive event handlers.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <CheckSquare size={16} />
            <span>Reactive Task Manager</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <Sliders size={16} />
            <span>useMemo() Metric Calculator</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'palette' ? 'active' : ''}`}
            onClick={() => setActiveTab('palette')}
          >
            <Palette size={16} />
            <span>Dynamic Theme Palette</span>
          </button>
        </div>

        {/* Playground Display Shell */}
        <div className="playground-shell">
          {/* TAB 1: Task Manager */}
          {activeTab === 'tasks' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 4 }}>Stateful Task Hub</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Demonstrating dynamic array state mutation and memoized filtering.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {(['all', 'active', 'completed'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`btn btn-sm ${filter === tab ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={addTask} className="todo-input-row">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Enter a new task..."
                  className="todo-input"
                />
                <button type="submit" className="btn btn-primary">
                  <Plus size={16} /> Add Task
                </button>
              </form>

              <div className="todo-list">
                {filteredTasks.map(task => (
                  <div key={task.id} className={`todo-item ${task.completed ? 'done' : ''}`}>
                    <div className="todo-meta" onClick={() => toggleTask(task.id)}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        style={{ cursor: 'pointer', width: 16, height: 16 }}
                      />
                      <span>{task.text}</span>
                      <span className="stack-pill" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>
                        {task.category}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{ color: '#ef4444', padding: 4 }}
                      title="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {filteredTasks.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No tasks found in this view.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Metric Calculator */}
          {activeTab === 'calculator' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 4 }}>Live Financial Metric Engine</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Leveraging React `useMemo` for cached real-time financial mathematical calculations.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <label className="form-label">Base Price ($)</label>
                  <input
                    type="number"
                    value={priceInput}
                    onChange={(e) => setPriceInput(Number(e.target.value))}
                    className="form-control"
                    min="0"
                  />
                </div>
                <div>
                  <label className="form-label">Discount Rate ({discountPercent}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  />
                </div>
                <div>
                  <label className="form-label">Estimated Tax ({taxRate}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  />
                </div>
              </div>

              {/* Calculated Results Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                <div className="preview-metric-box" style={{ marginBottom: 0 }}>
                  <div className="metric-header"><span>Discount</span></div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ef4444' }}>
                    -${calculations.discountAmount.toFixed(2)}
                  </div>
                </div>

                <div className="preview-metric-box" style={{ marginBottom: 0 }}>
                  <div className="metric-header"><span>Tax Addon</span></div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>
                    +${calculations.taxAmount.toFixed(2)}
                  </div>
                </div>

                <div className="preview-metric-box" style={{ marginBottom: 0, background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  <div className="metric-header"><span style={{ color: '#10b981' }}>Final Payable</span></div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981' }}>
                    ${calculations.finalTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Palette Generator */}
          {activeTab === 'palette' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 4 }}>Reactive Palette Engine</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Click any swatch to copy its HEX code to your clipboard.
                  </p>
                </div>
                <button onClick={generateRandomPalette} className="btn btn-primary btn-sm">
                  <RefreshCw size={14} /> Re-roll Palette
                </button>
              </div>

              <div className="palette-grid">
                {colors.map((hex, idx) => (
                  <div
                    key={idx}
                    className="palette-card"
                    style={{ backgroundColor: hex }}
                    onClick={() => copyColor(hex)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{hex}</span>
                      {copiedHex === hex ? <Check size={14} /> : <Copy size={14} />}
                    </div>
                  </div>
                ))}
              </div>

              {copiedHex && (
                <div style={{ textAlign: 'center', marginTop: '1rem', color: '#10b981', fontSize: '0.9rem', fontWeight: 600 }}>
                  Copied {copiedHex} to clipboard!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

