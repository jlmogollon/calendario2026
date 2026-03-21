const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MONTHS_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const CATEGORIES_DEFAULT = [
  { id:'red',     label:'Ayuno / Oración',         color:'#c46060' },
  { id:'gold',    label:'Culto / Confraternidad',   color:'#c8a96e' },
  { id:'skyblue', label:'Congresos / Convenciones', color:'#4ab0d4' },
  { id:'green',   label:'Campamentos',              color:'#6aab6a' },
  { id:'blue',    label:'Evangelismo',              color:'#5a8ec8' },
  { id:'teal',    label:'Misiones',                 color:'#5aab9b' },
  { id:'orange',  label:'Escuela / Formación',      color:'#d4845a' },
  { id:'purple',  label:'PAFIM / Parejas',          color:'#9b7ec8' },
  { id:'pink',    label:'Mujeres / HDV',            color:'#c47a9b' },
  { id:'dark',    label:'Asamblea / Directivos',    color:'#667080' },
  { id:'gray',    label:'Otros',                    color:'#6b7280' },
];
let CATEGORIES = [...CATEGORIES_DEFAULT];

function catColor(id) {
  const c = CATEGORIES.find(x => x.id === id);
  return c ? c.color : '#6b7280';
}
function catLabel(id) {
  const c = CATEGORIES.find(x => x.id === id);
  return c ? c.label : 'Otros';
}

// Eventos: se cargan desde Firestore al iniciar (o quedan vacíos si no hay Firebase)
let events = [
  // ENERO (datos iniciales por si Firestore está vacío; si usas Firestore se cargan desde allí)
  { id:1,  name:'Reunión Lid Distritales H. de Pastores Virtual', start:'2026-01-05', end:'2026-01-05', desc:'', cat:'orange', level:'distrital' },
  { id:2,  name:'Ayuno Nacional', start:'2026-01-10', end:'2026-01-10', desc:'', cat:'red', level:'nacional' },
  { id:3,  name:'Culto Misionero', start:'2026-01-11', end:'2026-01-11', desc:'', cat:'gold', level:'local' },
  { id:4,  name:'Instalación Asamblea de Ministros', start:'2026-01-12', end:'2026-01-12', desc:'', cat:'dark', level:'nacional' },
  { id:6,  name:'Escuela Eleazar H. de Pastores', start:'2026-01-19', end:'2026-01-19', desc:'20:00h', cat:'orange', level:'distrital' },
  { id:7,  name:'Reunión Con CAM', start:'2026-01-24', end:'2026-01-24', desc:'09:00h', cat:'gray', level:'local' },
  { id:8,  name:'Reunión Extraordinaria Formativa Misiones Virtual Taller IPUC', start:'2026-01-26', end:'2026-01-26', desc:'14:00h', cat:'teal', level:'nacional' },
  { id:9,  name:'Comunicaciones Líderes Distritales', start:'2026-01-28', end:'2026-01-28', desc:'', cat:'gray', level:'distrital' },
  { id:10, name:'Evangelismo Evento Nac Recién Bautizados', start:'2026-01-30', end:'2026-01-30', desc:'20:00h', cat:'blue', level:'nacional' },
  { id:11, name:'Encuentro Oración HDPast', start:'2026-01-30', end:'2026-01-30', desc:'', cat:'pink', level:'distrital' },
  { id:12, name:'Misiones Líderes Distritales', start:'2026-01-31', end:'2026-01-31', desc:'', cat:'teal', level:'distrital' },
  { id:246,name:'Junta Local: Revisión Planes de Trabajo', start:'2026-01-31', end:'2026-01-31', desc:'Revisión planes todas las directivas', cat:'dark', level:'local' },

  // FEBRERO
  { id:15, name:'Líderes Dist HDV', start:'2026-02-04', end:'2026-02-04', desc:'21:00h', cat:'pink', level:'distrital' },
  { id:16, name:'PAFIM Ayuno', start:'2026-02-06', end:'2026-02-06', desc:'', cat:'purple', level:'nacional' },
  { id:17, name:'Evangelismo Líderes Distritales', start:'2026-02-06', end:'2026-02-06', desc:'20-22h', cat:'blue', level:'distrital' },
  { id:168,name:'ED: Ayuno Nacional de Maestros', start:'2026-02-07', end:'2026-02-07', desc:'Evento distrital Escuela Dominical', cat:'red', level:'distrital' },
  { id:259,name:'Evangelismo: Cada líder (todos los pueblos)', start:'2026-02-07', end:'2026-02-07', desc:'Evangelismo local - cada líder en su pueblo', cat:'blue', level:'local' },
  { id:18, name:'Culto Misionero', start:'2026-02-08', end:'2026-02-08', desc:'', cat:'gold', level:'local' },
  { id:19, name:'Escuela Eleazar', start:'2026-02-09', end:'2026-02-09', desc:'20:00h', cat:'orange', level:'distrital' },
  { id:216,name:'Jóvenes: Alborada', start:'2026-02-11', end:'2026-02-11', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:20, name:'Parejas Pastorales PAFIM Diplomado', start:'2026-02-11', end:'2026-02-11', desc:'16:00-18:00h', cat:'purple', level:'nacional' },
  { id:21, name:'M08 Seminario de Líderes VIA ZOOM', start:'2026-02-12', end:'2026-02-13', desc:'', cat:'gray', level:'distrital' },
  { id:22, name:'Ayuno Nacional e Jornada Nacional de Intercesión', start:'2026-02-14', end:'2026-02-14', desc:'', cat:'red', level:'nacional' },
  { id:166,name:'Comunicaciones: Capacitación interna (CapCut, Canva, Holyrics)', start:'2026-02-15', end:'2026-02-15', desc:'15:30h. Capacitación equipo comunicaciones', cat:'gray', level:'local' },
  { id:169,name:'ED: Taller de Maestros – Evaluación de capacidad', start:'2026-02-15', end:'2026-02-15', desc:'Evento local Escuela Dominical', cat:'orange', level:'local' },
  { id:23, name:'PAFIM Lanzamiento Esp de Pastores Nacional', start:'2026-02-18', end:'2026-02-18', desc:'19:00h', cat:'purple', level:'nacional' },
  { id:24, name:'ETOR Lanzamiento a Pastores', start:'2026-02-20', end:'2026-02-20', desc:'20:00h', cat:'gray', level:'distrital' },
  { id:25, name:'Confraternidad 01', start:'2026-02-21', end:'2026-02-21', desc:'', cat:'gold', level:'local' },
  { id:202,name:'Jóvenes: Ayuno del Comité', start:'2026-02-22', end:'2026-02-22', desc:'Último domingo del mes', cat:'red', level:'local' },
  { id:26, name:'Parejas Pastorales PAFIM Diplomado', start:'2026-02-25', end:'2026-02-25', desc:'16:00-18:00h', cat:'purple', level:'nacional' },
  { id:227,name:'Jóvenes: Formación - Secretos de la Oración', start:'2026-02-27', end:'2026-02-27', desc:'Formación bimestral. Jer 33:3', cat:'orange', level:'local' },
  { id:27, name:'Adoles - 19:21H', start:'2026-02-27', end:'2026-02-27', desc:'', cat:'gray', level:'local' },
  { id:28, name:'MISIONEROS y Esposas - Reunión IPUC Colombia', start:'2026-02-27', end:'2026-02-27', desc:'7:00h Colombia', cat:'teal', level:'nacional' },
  { id:29, name:'Evangelismo Vigilia Presencial / PAFIM Iglesia', start:'2026-02-27', end:'2026-02-27', desc:'', cat:'blue', level:'local' },
  { id:30, name:'Cumbre de Líderes GV', start:'2026-02-28', end:'2026-02-28', desc:'', cat:'gray', level:'nacional' },
  { id:31, name:'Taller de Líderes Locales Misiones', start:'2026-02-28', end:'2026-02-28', desc:'', cat:'teal', level:'nacional' },
  { id:253,name:'Misiones: Taller Nacional Líderes Locales', start:'2026-02-28', end:'2026-02-28', desc:'Taller Nacional con Líderes Locales', cat:'teal', level:'nacional' },

  // MARZO
  { id:238,name:'Jóvenes: Integración - Un mismo corazón', start:'2026-03-01', end:'2026-03-01', desc:'Integración 1er trimestre. Col 3:14. 18:30-20h en la Iglesia', cat:'green', level:'local' },
  { id:32, name:'Evangelismo Ayuno Almas ALBORADA MDB', start:'2026-03-04', end:'2026-03-04', desc:'', cat:'blue', level:'local' },
  { id:33, name:'PAFIM Diplomado', start:'2026-03-04', end:'2026-03-04', desc:'16:00-18:00h', cat:'purple', level:'nacional' },
  { id:170,name:'ED: Alborada mensual maestros y padres', start:'2026-03-06', end:'2026-03-06', desc:'1er viernes de cada mes', cat:'orange', level:'local' },
  { id:34, name:'PAFIM Libelulas', start:'2026-03-06', end:'2026-03-06', desc:'20:00h', cat:'purple', level:'nacional' },
  { id:35, name:'Ex Esposas de Pastores', start:'2026-03-06', end:'2026-03-06', desc:'', cat:'pink', level:'distrital' },
  { id:36, name:'Ayuno Nacional / Esposas de Pastores', start:'2026-03-07', end:'2026-03-07', desc:'', cat:'red', level:'nacional' },
  { id:37, name:'Culto Misionero', start:'2026-03-08', end:'2026-03-08', desc:'', cat:'gold', level:'local' },
  { id:38, name:'Escuela Eleazar', start:'2026-03-09', end:'2026-03-09', desc:'20:00h', cat:'orange', level:'distrital' },
  { id:217,name:'Jóvenes: Alborada', start:'2026-03-11', end:'2026-03-11', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:39, name:'Hijos de Pastores Padres (Pastores)', start:'2026-03-11', end:'2026-03-11', desc:'20:00h', cat:'orange', level:'distrital' },
  { id:40, name:'Comunicaciones Diseño Gráfico', start:'2026-03-13', end:'2026-03-13', desc:'19:00h', cat:'gray', level:'local' },
  { id:41, name:'HDV Congresos Frutos E Santo Distritos 1-8', start:'2026-03-14', end:'2026-03-14', desc:'', cat:'pink', level:'distrital' },
  { id:237,name:'Jóvenes: Congreso Distrital', start:'2026-03-14', end:'2026-03-14', desc:'Congreso Distrital de Jóvenes', cat:'skyblue', level:'distrital' },
  { id:42, name:'Congreso de Jóvenes Distritos 9 al 16', start:'2026-03-14', end:'2026-03-16', desc:'', cat:'skyblue', level:'distrital' },
  { id:43, name:'MDB Acompañamiento a Esposa de Pastores', start:'2026-03-16', end:'2026-03-16', desc:'17:00h', cat:'gray', level:'distrital' },
  { id:44, name:'Taller Virtual de Artística', start:'2026-03-18', end:'2026-03-18', desc:'20:00h', cat:'gray', level:'nacional' },
  { id:45, name:'Campamento Nacional de Evangelismo', start:'2026-03-20', end:'2026-03-22', desc:'Albergue de Alarcón - Cuenca', cat:'green', level:'nacional' },
  { id:254,name:'Misiones: Campamento Nac. Evangelismo', start:'2026-03-20', end:'2026-03-22', desc:'Campamento Nacional de Evangelismo', cat:'green', level:'nacional' },
  { id:228,name:'Jóvenes: Formación - El ayuno que he escogido', start:'2026-03-20', end:'2026-03-20', desc:'Formación bimestral. Is 58:6', cat:'orange', level:'local' },
  { id:260,name:'Evangelismo: V.Cañada - Hombres de Verdad', start:'2026-03-21', end:'2026-03-21', desc:'Evangelismo Villanueva de la Cañada', cat:'blue', level:'local' },
  { id:203,name:'Jóvenes: Ayuno del Comité', start:'2026-03-29', end:'2026-03-29', desc:'Último domingo del mes', cat:'red', level:'local' },
  { id:46, name:'MBO Nativas', start:'2026-03-27', end:'2026-03-27', desc:'20h', cat:'teal', level:'distrital' },
  { id:47, name:'Reunión Misiones Extranjeras Pastores y Esposas Colombia', start:'2026-03-27', end:'2026-03-27', desc:'7:00h', cat:'teal', level:'nacional' },
  { id:48, name:'Campamento Nac de Evang', start:'2026-03-27', end:'2026-03-29', desc:'', cat:'green', level:'nacional' },
  { id:49, name:'1er Taller Artística', start:'2026-03-27', end:'2026-03-27', desc:'', cat:'gray', level:'nacional' },
  { id:50, name:'Campamento Hijos de Pastores', start:'2026-03-27', end:'2026-03-29', desc:'', cat:'green', level:'nacional' },
  { id:171,name:'ED: Taller de Padres – Caja de dudas y sugerencias', start:'2026-03-15', end:'2026-03-15', desc:'Evento local Escuela Dominical', cat:'orange', level:'local' },

  // ABRIL
  { id:172,name:'ED: Alborada mensual maestros y padres', start:'2026-04-03', end:'2026-04-03', desc:'1er viernes de cada mes', cat:'orange', level:'local' },
  { id:157,name:'Alabanza: Devocional presencial grupo de alabanza', start:'2026-04-04', end:'2026-04-04', desc:'10:00-11:00h. Adoración y oración', cat:'gold', level:'local' },
  { id:51, name:'Culto Nacional Obra Social', start:'2026-04-05', end:'2026-04-05', desc:'', cat:'gold', level:'nacional' },
  { id:52, name:'1er Dist Hijos de Pastores', start:'2026-04-06', end:'2026-04-06', desc:'20:00h', cat:'orange', level:'distrital' },
  { id:218,name:'Jóvenes: Alborada', start:'2026-04-08', end:'2026-04-08', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:255,name:'Misiones: 1er Campamento Nac. de Misiones', start:'2026-04-10', end:'2026-04-12', desc:'1er Campamento Nacional de Misiones. Alarcón - Cuenca', cat:'teal', level:'nacional' },
  { id:53, name:'PAFIM Seminario Padres', start:'2026-04-10', end:'2026-04-10', desc:'20:00-22:00h', cat:'purple', level:'nacional' },
  { id:54, name:'Ayuno Nacional Todas las Iglesias', start:'2026-04-11', end:'2026-04-11', desc:'', cat:'red', level:'nacional' },
  { id:55, name:'Escuela Dominical Congreso Nacional D1,6,7,8,9,11,13', start:'2026-04-11', end:'2026-04-11', desc:'', cat:'gray', level:'nacional' },
  { id:56, name:'Culto Misionero', start:'2026-04-12', end:'2026-04-12', desc:'', cat:'gold', level:'local' },
  { id:57, name:'Escuela Eleazar', start:'2026-04-13', end:'2026-04-13', desc:'20:00h', cat:'orange', level:'distrital' },
  { id:59, name:'Congreso NAC MDB Barcelona', start:'2026-04-14', end:'2026-04-16', desc:'', cat:'skyblue', level:'nacional' },
  { id:58, name:'Día del Niño Esc. Dominical', start:'2026-04-15', end:'2026-04-15', desc:'', cat:'gray', level:'local' },
  { id:174,name:'ED: Día del Niño', start:'2026-04-19', end:'2026-04-19', desc:'Celebración nacional 15 de abril', cat:'gold', level:'local' },
  { id:160,name:'HDV: Vigilia (pro recepción del Espíritu Santo)', start:'2026-04-03', end:'2026-04-03', desc:'Primera vigilia del año. Comité Caballeros', cat:'red', level:'local' },
  { id:213,name:'Jóvenes: Ayuno Trimestral', start:'2026-04-18', end:'2026-04-18', desc:'Ayuno General de Jóvenes 8 a 14h', cat:'red', level:'local' },
  { id:161,name:'HDV: Congreso Nacional Hombres de Verdad', start:'2026-04-18', end:'2026-04-18', desc:'Sede por confirmar. Lema "EVIDENCIAS"', cat:'skyblue', level:'nacional' },
  { id:60, name:'Campamento Nacional Misiones', start:'2026-04-17', end:'2026-04-19', desc:'', cat:'green', level:'nacional' },
  { id:61, name:'Congreso Nacional HOV D8-10-11-12-13-14-15-16', start:'2026-04-18', end:'2026-04-19', desc:'', cat:'pink', level:'nacional' },
  { id:62, name:'Congreso GV Distritos 1 al 8', start:'2026-04-18', end:'2026-04-19', desc:'', cat:'skyblue', level:'distrital' },
  { id:197,name:'Intercesión: Culto (Hna. Maria Elda predicadora)', start:'2026-04-21', end:'2026-04-21', desc:'Comité de Intercesión', cat:'red', level:'local' },
  { id:63, name:'Ayuno Nacional de Pastores - Intercesión', start:'2026-04-22', end:'2026-04-22', desc:'08:00-14:00h', cat:'red', level:'nacional' },
  { id:67, name:'Salida Evang Ceuta Melilla', start:'2026-04-23', end:'2026-04-25', desc:'', cat:'blue', level:'nacional' },
  { id:64, name:'Solo Misioneros - Reunión IPUC Colombia', start:'2026-04-24', end:'2026-04-24', desc:'7:00h', cat:'teal', level:'nacional' },
  { id:229,name:'Jóvenes: Formación - Guardando tu palabra', start:'2026-04-24', end:'2026-04-24', desc:'Formación bimestral. Salmo 119:9', cat:'orange', level:'local' },
  { id:65, name:'1er Campamento Nacional Polonia', start:'2026-04-25', end:'2026-04-26', desc:'', cat:'green', level:'nacional' },
  { id:66, name:'ESC Dom Congreso D2 al 16', start:'2026-04-25', end:'2026-04-25', desc:'', cat:'gray', level:'distrital' },
  { id:173,name:'ED: Congreso Nacional de Maestros', start:'2026-04-25', end:'2026-04-25', desc:'Evento distrital Escuela Dominical', cat:'skyblue', level:'distrital' },
  { id:204,name:'Jóvenes: Ayuno del Comité', start:'2026-04-26', end:'2026-04-26', desc:'Último domingo del mes', cat:'red', level:'local' },

  // MAYO
  { id:68, name:'Campamento de Músicos', start:'2026-05-01', end:'2026-05-03', desc:'', cat:'green', level:'nacional' },
  { id:175,name:'ED: Alborada mensual maestros y padres', start:'2026-05-01', end:'2026-05-01', desc:'1er viernes de cada mes', cat:'orange', level:'local' },
  { id:198,name:'Intercesión: Vigilia', start:'2026-05-01', end:'2026-05-01', desc:'Comité de Intercesión', cat:'red', level:'local' },
  { id:262,name:'Evangelismo: V.Pardillo - Intercesión', start:'2026-05-02', end:'2026-05-02', desc:'Evangelismo Villanueva del Pardillo', cat:'blue', level:'local' },
  { id:70, name:'Seminario de Líderes de Evangelismo', start:'2026-05-06', end:'2026-05-06', desc:'20:00h', cat:'blue', level:'distrital' },
  { id:71, name:'Ayuno Nacional', start:'2026-05-09', end:'2026-05-09', desc:'', cat:'red', level:'nacional' },
  { id:72, name:'Culto Misionero', start:'2026-05-10', end:'2026-05-10', desc:'', cat:'gold', level:'local' },
  { id:73, name:'Escuela Eleazar', start:'2026-05-11', end:'2026-05-11', desc:'20:00h', cat:'orange', level:'distrital' },
  { id:74, name:'HDV Lid Dist', start:'2026-05-13', end:'2026-05-13', desc:'21:00h', cat:'pink', level:'distrital' },
  { id:219,name:'Jóvenes: Alborada', start:'2026-05-13', end:'2026-05-13', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:75, name:'Seminario Virtual Esc. Dominical', start:'2026-05-15', end:'2026-05-15', desc:'20:00h', cat:'gray', level:'distrital' },
  { id:176,name:'ED: Seminario Virtual de Maestros', start:'2026-05-15', end:'2026-05-15', desc:'Innovación en la enseñanza bíblica para niños', cat:'orange', level:'distrital' },
  { id:76, name:'Taller de Comunicaciones', start:'2026-05-18', end:'2026-05-18', desc:'19:00h', cat:'gray', level:'local' },
  { id:77, name:'CONVENCION EUROPEA Alemania', start:'2026-05-23', end:'2026-05-24', desc:'', cat:'skyblue', level:'nacional' },
  { id:230,name:'Jóvenes: Formación - Santidad y temor de Dios', start:'2026-05-29', end:'2026-05-29', desc:'Formación bimestral. 2Cor.5:1 Rom 6:22', cat:'orange', level:'local' },
  { id:80, name:'MISIONEROS y Pastores - Reunión IPUC Colombia', start:'2026-05-29', end:'2026-05-29', desc:'7:00h', cat:'teal', level:'nacional' },
  { id:205,name:'Jóvenes: Ayuno del Comité', start:'2026-05-31', end:'2026-05-31', desc:'Último domingo del mes', cat:'red', level:'local' },

  // JUNIO
  { id:81, name:'Líderes Dist Hijos de Pastores', start:'2026-06-01', end:'2026-06-01', desc:'', cat:'orange', level:'distrital' },
  { id:177,name:'ED: Alborada mensual maestros y padres', start:'2026-06-05', end:'2026-06-05', desc:'1er viernes de cada mes', cat:'orange', level:'local' },
  { id:82, name:'PAFIM Encuentro Nac Hijos Libelulos', start:'2026-06-06', end:'2026-06-06', desc:'20:00h', cat:'purple', level:'nacional' },
  { id:84, name:'Escuela Eleazar', start:'2026-06-08', end:'2026-06-08', desc:'', cat:'orange', level:'distrital' },
  { id:220,name:'Jóvenes: Alborada', start:'2026-06-11', end:'2026-06-11', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:87, name:'Campamento Pordenone Hno. Víctor', start:'2026-06-12', end:'2026-06-14', desc:'', cat:'green', level:'nacional' },
  { id:85, name:'Ayuno Nacional', start:'2026-06-13', end:'2026-06-13', desc:'', cat:'red', level:'nacional' },
  { id:199,name:'Intercesión: Integración con las Gemas', start:'2026-06-13', end:'2026-06-13', desc:'Con músicos y psicóloga. Comité de Intercesión', cat:'pink', level:'local' },
  { id:86, name:'Culto Misionero', start:'2026-06-14', end:'2026-06-14', desc:'', cat:'gold', level:'local' },
  { id:88, name:'2ª Charla Padres Hijos Pastores Zoom', start:'2026-06-17', end:'2026-06-17', desc:'20:00h', cat:'orange', level:'distrital' },
  { id:89, name:'Evangelismo 3er Encuentro Familias REFAM VIRTUAL', start:'2026-06-19', end:'2026-06-19', desc:'20:00h', cat:'blue', level:'nacional' },
  { id:256,name:'Misiones: Enc. Nac. Evangelismo REFAM', start:'2026-06-19', end:'2026-06-19', desc:'Encuentro Nacional de Evangelismo REFAM. 20:00h', cat:'blue', level:'nacional' },
  { id:90, name:'Esc Dominical - Apologética Infantil', start:'2026-06-20', end:'2026-06-20', desc:'Todas las iglesias locales', cat:'gray', level:'local' },
  { id:179,name:'ED: Día Nac de Apologética Infantil', start:'2026-06-20', end:'2026-06-20', desc:'Contra la ideología de género. Evento distrital', cat:'skyblue', level:'distrital' },
  { id:239,name:'Jóvenes: Olimpiadas + Integración', start:'2026-06-20', end:'2026-06-20', desc:'Olimpiadas Bíblicas locales + Integración 2do trimestre', cat:'blue', level:'local' },
  { id:178,name:'ED: Taller de Niños – Tipo foro', start:'2026-06-21', end:'2026-06-21', desc:'Ideología de género. Evento local', cat:'orange', level:'local' },
  { id:91, name:'MISIONEROS y ESPOSAS - Reunión IPUC Colombia', start:'2026-06-26', end:'2026-06-26', desc:'7:00h', cat:'teal', level:'nacional' },
  { id:92, name:'MDB Encuentro de Nativas', start:'2026-06-26', end:'2026-06-26', desc:'20:00h', cat:'teal', level:'distrital' },
  { id:231,name:'Jóvenes: Formación - Su nombre me sostiene', start:'2026-06-26', end:'2026-06-26', desc:'Formación bimestral. Hechos 4:12', cat:'orange', level:'local' },
  { id:240,name:'Jóvenes: Culto de Intercambio "Renovados"', start:'2026-06-27', end:'2026-06-27', desc:'Culto de intercambio con Villalba, Galapagar y Guadalajara', cat:'gold', level:'local' },
  { id:263,name:'Evangelismo: Brunete - Escuela Dominical', start:'2026-06-27', end:'2026-06-27', desc:'Evangelismo Brunete', cat:'blue', level:'local' },
  { id:270,name:'Misiones: Serenata Especial Amigos', start:'2026-06-27', end:'2026-06-27', desc:'Serenata Especial para amigos', cat:'teal', level:'local' },
  { id:271,name:'Misiones: Campaña Evangelística (Auditorio)', start:'2026-06-28', end:'2026-06-28', desc:'Campaña evangelística en el auditorio', cat:'blue', level:'local' },
  { id:206,name:'Jóvenes: Ayuno del Comité', start:'2026-06-28', end:'2026-06-28', desc:'Último domingo del mes', cat:'red', level:'local' },

  // JULIO
  { id:180,name:'ED: Alborada mensual maestros y padres', start:'2026-07-03', end:'2026-07-03', desc:'1er viernes de cada mes', cat:'orange', level:'local' },
  { id:94, name:'MDB Acompañamiento a Esposa de Pastores', start:'2026-07-06', end:'2026-07-06', desc:'17:00h', cat:'gray', level:'distrital' },
  { id:221,name:'Jóvenes: Alborada', start:'2026-07-08', end:'2026-07-08', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:95, name:'Ayuno Nacional', start:'2026-07-11', end:'2026-07-11', desc:'', cat:'red', level:'nacional' },
  { id:96, name:'Culto Misionero', start:'2026-07-12', end:'2026-07-12', desc:'', cat:'gold', level:'local' },
  { id:97, name:'Escuela Eleazar', start:'2026-07-13', end:'2026-07-13', desc:'', cat:'orange', level:'distrital' },
  { id:241,name:'Jóvenes: Evangelismo Especial', start:'2026-07-11', end:'2026-07-11', desc:'Evangelismo dinámico especial con juegos y retos', cat:'blue', level:'local' },
  { id:181,name:'ED: Evangelismo Infantil Nacional', start:'2026-07-18', end:'2026-07-18', desc:'Evento distrital Escuela Dominical', cat:'blue', level:'distrital' },
  { id:182,name:'ED: Integración Evangelística', start:'2026-07-18', end:'2026-07-18', desc:'Evento local Escuela Dominical', cat:'blue', level:'local' },
  { id:214,name:'Jóvenes: Ayuno Trimestral', start:'2026-07-18', end:'2026-07-18', desc:'Ayuno General de Jóvenes 8 a 14h', cat:'red', level:'local' },
  { id:264,name:'Evangelismo: Majadahonda - Jóvenes', start:'2026-07-18', end:'2026-07-18', desc:'Evangelismo Majadahonda', cat:'blue', level:'local' },
  { id:232,name:'Jóvenes: Formación - Creciendo en todo tiempo', start:'2026-07-24', end:'2026-07-24', desc:'Formación bimestral. 2Tim 3:17', cat:'orange', level:'local' },
  { id:98, name:'MISIONEROS y Pastores - Reunión IPUC Colombia', start:'2026-07-24', end:'2026-07-24', desc:'7:00h', cat:'teal', level:'nacional' },
  { id:207,name:'Jóvenes: Ayuno del Comité', start:'2026-07-26', end:'2026-07-26', desc:'Último domingo del mes', cat:'red', level:'local' },
  { id:99, name:'Solo Pastores - Reunión IPUC Colombia', start:'2026-07-31', end:'2026-07-31', desc:'7:00h', cat:'gray', level:'nacional' },

  // AGOSTO
  { id:183,name:'ED: Alborada mensual maestros y padres', start:'2026-08-07', end:'2026-08-07', desc:'1er viernes de cada mes', cat:'orange', level:'local' },
  { id:102,name:'Reunión Líderes Distritales H. de Pastores', start:'2026-08-03', end:'2026-08-03', desc:'', cat:'orange', level:'distrital' },
  { id:103,name:'Jornada de Intercesión', start:'2026-08-08', end:'2026-08-08', desc:'', cat:'red', level:'nacional' },
  { id:104,name:'Ayuno Nacional', start:'2026-08-08', end:'2026-08-08', desc:'', cat:'red', level:'nacional' },
  { id:105,name:'Culto Misionero', start:'2026-08-09', end:'2026-08-09', desc:'', cat:'gold', level:'local' },
  { id:106,name:'Escuela Eleazar', start:'2026-08-10', end:'2026-08-10', desc:'', cat:'orange', level:'distrital' },
  { id:222,name:'Jóvenes: Alborada', start:'2026-08-12', end:'2026-08-12', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:107,name:'HOV Líderes Distritales', start:'2026-08-12', end:'2026-08-12', desc:'21:00h', cat:'pink', level:'distrital' },
  { id:200,name:'Intercesión: Culto (Hna. Silvia predicadora)', start:'2026-08-18', end:'2026-08-18', desc:'Comité de Intercesión', cat:'red', level:'local' },
  { id:242,name:'Jóvenes: Campamento Nacional', start:'2026-08-21', end:'2026-08-23', desc:'Campamento Nacional de Jóvenes', cat:'green', level:'nacional' },
  { id:265,name:'Evangelismo: S.M.Valdeiglesias - Recepción', start:'2026-08-22', end:'2026-08-22', desc:'Evangelismo San Martín de Valdeiglesias', cat:'blue', level:'local' },
  { id:233,name:'Jóvenes: Formación - Pensamientos y emociones', start:'2026-08-28', end:'2026-08-28', desc:'Formación bimestral. Prov 4:23', cat:'orange', level:'local' },
  { id:108,name:'MISIONEROS Y PASTORES - Reunión IPUC Colombia', start:'2026-08-28', end:'2026-08-28', desc:'7:00h', cat:'teal', level:'nacional' },
  { id:208,name:'Jóvenes: Ayuno del Comité', start:'2026-08-30', end:'2026-08-30', desc:'Último domingo del mes', cat:'red', level:'local' },

  // SEPTIEMBRE
  { id:186,name:'ED: Alborada mensual maestros y padres', start:'2026-09-04', end:'2026-09-04', desc:'1er viernes de cada mes', cat:'orange', level:'local' },
  { id:257,name:'Misiones: Confraternidad Nac. Misionera', start:'2026-09-05', end:'2026-09-05', desc:'Confraternidad Nacional Misionera', cat:'teal', level:'nacional' },
  { id:110,name:'Evangelismo Ayuno Españoles', start:'2026-09-02', end:'2026-09-02', desc:'', cat:'blue', level:'local' },
  { id:111,name:'Confraternidad Misionera', start:'2026-09-05', end:'2026-09-05', desc:'', cat:'gold', level:'local' },
  { id:223,name:'Jóvenes: Alborada', start:'2026-09-09', end:'2026-09-09', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:112,name:'Evangelismo Seminario de Líderes Distritales', start:'2026-09-11', end:'2026-09-11', desc:'20-22h', cat:'blue', level:'distrital' },
  { id:234,name:'Jóvenes: Formación - Mi cuerpo, templo del Espíritu', start:'2026-09-11', end:'2026-09-11', desc:'Formación bimestral. 1Cor 3:17', cat:'orange', level:'local' },
  { id:113,name:'Ayuno Nacional', start:'2026-09-12', end:'2026-09-12', desc:'', cat:'red', level:'nacional' },
  { id:114,name:'Culto Misionero - Los Pies en las Misiones', start:'2026-09-13', end:'2026-09-13', desc:'', cat:'gold', level:'local' },
  { id:187,name:'ED: Domingo Nacional del Niño Misionero', start:'2026-09-13', end:'2026-09-13', desc:'Evento distrital Escuela Dominical', cat:'teal', level:'distrital' },
  { id:116,name:'Escuela Eleazar', start:'2026-09-14', end:'2026-09-14', desc:'', cat:'orange', level:'distrital' },
  { id:117,name:'3ª Charla con Padres H. Pastores', start:'2026-09-16', end:'2026-09-16', desc:'20:00h', cat:'orange', level:'distrital' },
  { id:118,name:'PAFIM Ayuno / Esposas e Hijos localmente', start:'2026-09-18', end:'2026-09-18', desc:'', cat:'purple', level:'local' },
  { id:266,name:'Evangelismo: V.Cañada - Alabanza', start:'2026-09-19', end:'2026-09-19', desc:'Evangelismo Villanueva de la Cañada', cat:'blue', level:'local' },
  { id:188,name:'ED: Niño Misionero', start:'2026-09-20', end:'2026-09-20', desc:'Evento local Escuela Dominical', cat:'teal', level:'local' },
  { id:119,name:'MISIONEROS y Pastores - Reunión IPUC Colombia', start:'2026-09-25', end:'2026-09-25', desc:'7:00h', cat:'teal', level:'nacional' },
  { id:120,name:'Confraternidad 01', start:'2026-09-26', end:'2026-09-26', desc:'', cat:'gold', level:'local' },
  { id:121,name:'Evangelismo Nac MDB Simultáneo', start:'2026-09-26', end:'2026-09-26', desc:'', cat:'blue', level:'nacional' },
  { id:201,name:'Intercesión: Vigilia', start:'2026-09-25', end:'2026-09-25', desc:'Comité de Intercesión', cat:'red', level:'local' },
  { id:243,name:'Jóvenes: Vigilia "Jóvenes con Poder"', start:'2026-09-25', end:'2026-09-25', desc:'Vigilia de Jóvenes 19 a 24h. Hechos 1:8', cat:'red', level:'local' },
  { id:209,name:'Jóvenes: Ayuno del Comité', start:'2026-09-27', end:'2026-09-27', desc:'Último domingo del mes', cat:'red', level:'local' },

  // OCTUBRE
  { id:189,name:'ED: Alborada mensual maestros y padres', start:'2026-10-02', end:'2026-10-02', desc:'1er viernes de cada mes', cat:'orange', level:'local' },
  { id:124,name:'Vigilia Multinaciones', start:'2026-10-02', end:'2026-10-02', desc:'21:00-24:00h', cat:'gold', level:'local' },
  { id:244,name:'Jóvenes: Integración - Guardar la unidad', start:'2026-10-02', end:'2026-10-02', desc:'Integración 3er trimestre. Ef 4:3. Después del ayuno nacional', cat:'green', level:'local' },
  { id:159,name:'Alabanza: Devocional presencial grupo de alabanza', start:'2026-10-03', end:'2026-10-03', desc:'10:00-11:00h. Adoración y oración', cat:'gold', level:'local' },
  { id:125,name:'Reunión Líderes Distritales H.P.', start:'2026-10-05', end:'2026-10-05', desc:'', cat:'orange', level:'distrital' },
  { id:126,name:'Enseñanza Virtual Matrimonios "Served al Señor" Austria', start:'2026-10-06', end:'2026-10-06', desc:'19:00-20:00h', cat:'purple', level:'nacional' },
  { id:224,name:'Jóvenes: Alborada', start:'2026-10-07', end:'2026-10-07', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:127,name:'Ayuno Nacional', start:'2026-10-10', end:'2026-10-10', desc:'', cat:'red', level:'nacional' },
  { id:128,name:'Culto Misionero', start:'2026-10-11', end:'2026-10-11', desc:'', cat:'gold', level:'local' },
  { id:129,name:'Escuela Eleazar', start:'2026-10-12', end:'2026-10-12', desc:'', cat:'orange', level:'distrital' },
  { id:130,name:'CONVENCION IPUE ESPAÑA', start:'2026-10-16', end:'2026-10-18', desc:'', cat:'skyblue', level:'nacional' },
  { id:215,name:'Jóvenes: Ayuno Trimestral', start:'2026-10-24', end:'2026-10-24', desc:'Ayuno General de Jóvenes 8 a 14h', cat:'red', level:'local' },
  { id:210,name:'Jóvenes: Ayuno del Comité', start:'2026-10-25', end:'2026-10-25', desc:'Último domingo del mes', cat:'red', level:'local' },
  { id:131,name:'HOV Líderes Gac. Distrito 11', start:'2026-10-28', end:'2026-10-28', desc:'', cat:'pink', level:'distrital' },
  { id:267,name:'Evangelismo: Brunete - Misiones', start:'2026-10-31', end:'2026-10-31', desc:'Evangelismo Brunete - Comité de Misiones', cat:'blue', level:'local' },
  { id:190,name:'ED: Vigilia Nacional para Niños', start:'2026-10-31', end:'2026-10-31', desc:'Actividad de oración congregacional', cat:'red', level:'distrital' },
  { id:191,name:'ED: "Somos Niños de Luz, Celebramos la Vida"', start:'2026-10-31', end:'2026-10-31', desc:'Evento local Escuela Dominical', cat:'gold', level:'local' },
  { id:132,name:'Pastores y Esposas - Reunión IPUC Colombia', start:'2026-10-30', end:'2026-10-30', desc:'7:00h', cat:'teal', level:'nacional' },
  { id:133,name:'Escuela Dominical Vigilia Niños', start:'2026-10-31', end:'2026-10-31', desc:'', cat:'gray', level:'local' },

  // NOVIEMBRE
  { id:192,name:'ED: Alborada mensual maestros y padres', start:'2026-11-06', end:'2026-11-06', desc:'1er viernes de cada mes', cat:'orange', level:'local' },
  { id:235,name:'Jóvenes: Formación - Fieles con nuestros bienes', start:'2026-11-06', end:'2026-11-06', desc:'Formación bimestral. Prov 3:9-10', cat:'orange', level:'local' },
  { id:135,name:'Ayuno Multinaciones / Jornada de Intercesión', start:'2026-11-07', end:'2026-11-07', desc:'', cat:'red', level:'nacional' },
  { id:136,name:'Talleres Padres', start:'2026-11-07', end:'2026-11-07', desc:'16:00h', cat:'orange', level:'local' },
  { id:193,name:'ED: Taller Nacional de Padres (online)', start:'2026-11-07', end:'2026-11-07', desc:'¿Cómo guiar a mis hijos en el evangelio desde casa?', cat:'skyblue', level:'distrital' },
  { id:268,name:'Evangelismo: Majadahonda - DECOM', start:'2026-11-07', end:'2026-11-07', desc:'Evangelismo Majadahonda', cat:'blue', level:'local' },
  { id:138,name:'Culto Misionero', start:'2026-11-08', end:'2026-11-08', desc:'', cat:'gold', level:'local' },
  { id:139,name:'Escuela Eleazar', start:'2026-11-09', end:'2026-11-09', desc:'', cat:'orange', level:'distrital' },
  { id:225,name:'Jóvenes: Alborada', start:'2026-11-11', end:'2026-11-11', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:165,name:'HDV: Campamento Nacional "EVIDENCIAS"', start:'2026-11-13', end:'2026-11-15', desc:'Campamento Nacional Hombres de Verdad', cat:'green', level:'nacional' },
  { id:194,name:'ED: Taller de Maestros (Día del Maestro)', start:'2026-11-15', end:'2026-11-15', desc:'Evento local Escuela Dominical', cat:'orange', level:'local' },
  { id:141,name:'PAFIM Seminario de Parejas', start:'2026-11-16', end:'2026-11-16', desc:'19-21h', cat:'purple', level:'nacional' },
  { id:142,name:'Cadena Oración HP', start:'2026-11-20', end:'2026-11-20', desc:'19:00', cat:'red', level:'distrital' },
  { id:143,name:'Comunicaciones / Taller Redes Sociales', start:'2026-11-20', end:'2026-11-20', desc:'', cat:'gray', level:'local' },
  { id:144,name:'PAFIM Seminario Esp de Pastor', start:'2026-11-20', end:'2026-11-20', desc:'16-18h', cat:'purple', level:'nacional' },
  { id:145,name:'MISIONEROS y Pastores - Reunión IPUC Colombia', start:'2026-11-21', end:'2026-11-21', desc:'7:00h', cat:'teal', level:'nacional' },
  { id:146,name:'MDB Acompañamiento a Esposa de Pastores', start:'2026-11-23', end:'2026-11-23', desc:'17:00h', cat:'gray', level:'distrital' },
  { id:147,name:'MDB Alborada', start:'2026-11-25', end:'2026-11-25', desc:'', cat:'gray', level:'local' },
  { id:211,name:'Jóvenes: Ayuno del Comité', start:'2026-11-29', end:'2026-11-29', desc:'Último domingo del mes', cat:'red', level:'local' },
  { id:148,name:'Culto Acción de Gracias con Santa Cena', start:'2026-11-27', end:'2026-11-27', desc:'Todos', cat:'gold', level:'local' },
  { id:149,name:'Reunión IPUC Colombia', start:'2026-11-27', end:'2026-11-27', desc:'7:00h', cat:'teal', level:'nacional' },

  // DICIEMBRE
  { id:195,name:'ED: Alborada mensual maestros y padres', start:'2026-12-04', end:'2026-12-04', desc:'1er viernes de cada mes', cat:'orange', level:'local' },
  { id:150,name:'MISSION', start:'2026-12-04', end:'2026-12-05', desc:'', cat:'teal', level:'nacional' },
  { id:258,name:'Misiones: Devocional Distrital', start:'2026-12-05', end:'2026-12-05', desc:'6:00-7:00h. Lema: El clamor de un enviado', cat:'red', level:'distrital' },
  { id:269,name:'Evangelismo: V.Pardillo - Obra Social', start:'2026-12-05', end:'2026-12-05', desc:'Evangelismo Villanueva del Pardillo', cat:'blue', level:'local' },
  { id:236,name:'Jóvenes: Formación - No me avergüenzo', start:'2026-12-06', end:'2026-12-06', desc:'Formación bimestral. Romanos 1:16', cat:'orange', level:'local' },
  { id:151,name:'Reunión Líderes Hijos de Pastores', start:'2026-12-07', end:'2026-12-07', desc:'', cat:'orange', level:'distrital' },
  { id:226,name:'Jóvenes: Alborada', start:'2026-12-09', end:'2026-12-09', desc:'Alborada mensual 5-6h vía Zoom', cat:'gold', level:'local' },
  { id:152,name:'Charla para H. Pastores', start:'2026-12-09', end:'2026-12-09', desc:'20h', cat:'orange', level:'distrital' },
  { id:153,name:'Ayuno Nacional / Confraternidad Distrito 1', start:'2026-12-12', end:'2026-12-12', desc:'', cat:'red', level:'nacional' },
  { id:154,name:'Culto Misionero', start:'2026-12-13', end:'2026-12-13', desc:'', cat:'gold', level:'local' },
  { id:155,name:'Escuela Eleazar', start:'2026-12-14', end:'2026-12-14', desc:'', cat:'orange', level:'distrital' },
  { id:196,name:'ED: Taller de Padres', start:'2026-12-20', end:'2026-12-20', desc:'Evento local Escuela Dominical', cat:'orange', level:'local' },
  { id:212,name:'Jóvenes: Ayuno del Comité', start:'2026-12-27', end:'2026-12-27', desc:'Último domingo del mes', cat:'red', level:'local' },
  { id:245,name:'Jóvenes: Integración - Juntos en armonía', start:'2026-12-19', end:'2026-12-19', desc:'Integración 4to trimestre. Sal 133:1-3', cat:'green', level:'local' },
];

let nextId = 500;
let currentFilter = 'all';
let firestoreReady = false;
let isAdmin = localStorage.getItem('cal_admin_logged') === 'true';

document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
  // Ensure layout is up-to-date with auth state
});

function updateAuthUI() {
  const authBtn = document.getElementById('authBtn');
  if (authBtn) {
    if (isAdmin) {
      authBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>';
      authBtn.setAttribute('aria-label', 'Cerrar sesión');
      authBtn.onclick = logout;
    } else {
      authBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
      authBtn.setAttribute('aria-label', 'Ingresar como Administrador');
      authBtn.onclick = toggleAuthModal;
    }
  }
  const fab = document.querySelector('.fab');
  if (fab) fab.style.display = isAdmin ? 'flex' : 'none';
}

function toggleAuthModal() {
  document.getElementById('authModal').classList.toggle('open');
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('open');
}

function handleAuthOverlayClick(e) {
  if (e.target === e.currentTarget) closeAuthModal();
}

function login() {
  const password = document.getElementById('authPassword').value;
  if (password === '1507') {
    isAdmin = true;
    localStorage.setItem('cal_admin_logged', 'true');
    closeAuthModal();
    document.getElementById('authPassword').value = '';
    updateAuthUI();
    render();
    renderCalendar();
    showToast('Sesión iniciada');
  } else {
    alert('PIN incorrecto.');
  }
}

function logout() {
  isAdmin = false;
  localStorage.removeItem('cal_admin_logged');
  updateAuthUI();
  render();
  renderCalendar();
  showToast('Sesión cerrada');
}

async function loadFromFirestore() {
  if (!CONFIG_REF || !EVENTS_REF) { render(); renderCalendar(); return; }
  try {
    const configSnap = await CONFIG_REF.get();
    const config = configSnap.exists ? configSnap.data() : {};
    if (config.nextId != null) nextId = config.nextId;
    if (Array.isArray(config.categories) && config.categories.length > 0) CATEGORIES = config.categories;

    const eventsSnap = await EVENTS_REF.get();
    if (!eventsSnap.empty) {
      const list = eventsSnap.docs.map(d => {
        const data = d.data();
        return {
          id: parseInt(d.id, 10) || data.id,
          name: data.name || '',
          start: data.start || '',
          end: data.end || '',
          desc: data.desc || '',
          cat: data.cat || 'gray',
          level: data.level || 'local',
          comite: data.comite || '',
          timeStart: data.timeStart || '',
          timeEnd: data.timeEnd || ''
        };
      });
      // Mezcla: Firestore sobreescribe/añade por id, pero si hay pocos docs no borra los eventos por defecto del HTML.
      const byId = new Map();
      events.forEach(e => byId.set(e.id, e));
      list.forEach(e => byId.set(e.id, e));
      events = Array.from(byId.values()).sort((a, b) => (a.start || '').localeCompare(b.start || ''));
    }
    firestoreReady = true;
  } catch (err) {
    console.warn('Firestore load:', err);
  }
  render();
  renderCalendar();
}

async function saveEventToFirestore(evt) {
  if (!EVENTS_REF) return;
  const { id, name, start, end, desc, cat, level, comite, timeStart, timeEnd } = evt;
  await EVENTS_REF.doc(String(id)).set({ name, start, end, desc, cat, level, comite: comite || '', timeStart: timeStart || '', timeEnd: timeEnd || '' });
}

async function deleteEventFromFirestore(id) {
  if (!EVENTS_REF) return;
  await EVENTS_REF.doc(String(id)).delete();
}

async function saveConfigToFirestore() {
  if (!CONFIG_REF) return;
  await CONFIG_REF.set({ nextId, categories: CATEGORIES }, { merge: true });
}

let editingId = null;
let selectedLevel = 'local';
let currentViewMode = 'list';
let calYear = 2026;
let calMonth = 0;
let selectedDayDate = null;

function parseDate(s) {
  const [y,m,d] = s.split('-').map(Number);
  return new Date(y, m-1, d);
}
function dateDiff(s, e) {
  return Math.round((parseDate(e) - parseDate(s)) / 86400000) + 1;
}
function isError(evt) {
  return dateDiff(evt.start, evt.end) > 3;
}

function levelColor(l) {
  if (l === 'nacional') return '#c8943a';
  if (l === 'distrital') return '#48acd4';
  return '#52a878';
}

function render() {
  // Stats
  const filtered = currentFilter === 'all' ? events : events.filter(e => e.level === currentFilter);
  const nac = events.filter(e => e.level === 'nacional').length;
  const dist = events.filter(e => e.level === 'distrital').length;
  const loc = events.filter(e => e.level === 'local').length;
  document.getElementById('statsBar').innerHTML = `
    <div class="stat-item nac"><div class="stat-num">${nac}</div><div class="stat-label">Nacional</div></div>
    <div class="stat-item dist"><div class="stat-num">${dist}</div><div class="stat-label">Distrital</div></div>
    <div class="stat-item loc"><div class="stat-num">${loc}</div><div class="stat-label">Local</div></div>
  `;

  // Legend
  document.getElementById('legendGrid').innerHTML = CATEGORIES.map(c =>
    `<div class="legend-item"><div class="legend-dot" style="background:${c.color}"></div><span>${c.label}</span></div>`
  ).join('');

  // Sort events by date
  const sorted = [...filtered].sort((a,b) => a.start.localeCompare(b.start));

  // Group by month
  const byMonth = {};
  sorted.forEach(e => {
    const m = e.start.substring(0, 7); // YYYY-MM
    if (!byMonth[m]) byMonth[m] = [];
    byMonth[m].push(e);
  });

  const list = document.getElementById('eventsList');
  if (sorted.length === 0) {
    list.innerHTML = `<div class="empty-state"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg><p>No hay eventos para este filtro</p></div>`;
    return;
  }

  list.innerHTML = Object.entries(byMonth).map(([key, evts]) => {
    const [y, m] = key.split('-').map(Number);
    const monthName = MONTHS[m-1];
    const dots = ['nacional','distrital','local'].filter(l => evts.some(e => e.level === l)).map(l =>
      `<div class="month-dot" style="background:${levelColor(l)}"></div>`
    ).join('');
    const cards = evts.map(e => renderCard(e)).join('');
    return `<div class="month-group">
      <div class="month-header">
        <span class="month-name">${monthName}</span>
        <span class="month-count">${evts.length} evento${evts.length!==1?'s':''}</span>
        <div class="month-dots">${dots}</div>
      </div>
      ${cards}
    </div>`;
  }).join('');
}

function renderCard(e) {
  const s = parseDate(e.start);
  const isMulti = e.start !== e.end;
  const days = dateDiff(e.start, e.end);
  const hasError = isError(e);
  const endD = parseDate(e.end);
  const multiStr = isMulti ? `${days} días` : '';
  const clickHandler = isAdmin ? `onclick="openEditModal(${e.id})"` : '';
  return `<div class="event-card ev-${e.level} ${hasError ? 'ev-error' : ''}" ${clickHandler}>
    <div class="event-date-col">
      <div class="event-day">${s.getDate()}</div>
      <div class="event-month-short">${MONTHS_SHORT[s.getMonth()]}</div>
      ${isMulti ? `<div class="event-multi-day">→${endD.getDate()}</div>` : ''}
    </div>
    <div class="event-body">
      <div class="event-name">${e.name}</div>
      <div class="event-meta">
        <span class="level-badge badge-${e.level}">${e.level}</span>
        <span class="cat-tag" style="color:${catColor(e.cat)}">${catLabel(e.cat)}</span>
        ${e.comite ? `<span class="cat-tag" style="color:var(--sky);border-color:rgba(72,172,212,0.2)">${e.comite}</span>` : ''}
      </div>
      ${(e.timeStart||e.desc) ? `<div class="event-desc">${[e.timeStart?(e.timeStart+(e.timeEnd?'–'+e.timeEnd:'')+'h'):null, e.desc].filter(Boolean).join(' · ')}</div>` : ''}
    </div>
    ${hasError ? `<div class="error-icon" title="Evento de más de 3 días consecutivos">⚠️</div>` : ''}
  </div>`;
}

function setFilter(f) {
  currentFilter = f;
  ['all','nacional','distrital','local'].forEach(x => {
    const p = document.getElementById('pill-'+x);
    p.className = 'filter-pill';
    if (x === f) p.className = 'filter-pill active-'+x;
  });
  render();
}

function setView(v) {
  currentViewMode = v;
  document.getElementById('listSection').classList.toggle('active', v==='list');
  document.getElementById('calSection').classList.toggle('active', v==='cal');
  ['list','cal'].forEach(t => {
    document.getElementById('tab-'+t).classList.toggle('active', t===v);
  });
  if (v==='cal') renderCalendar();
}

function openAddModal() {
  editingId = null;
  selectedLevel = 'local';
  document.getElementById('modalTitle').textContent = 'Nuevo Evento';
  document.getElementById('evtName').value = '';
  document.getElementById('evtStart').value = '2026-01-01';
  document.getElementById('evtEnd').value = '2026-01-01';
  document.getElementById('evtDesc').value = '';
  document.getElementById('evtComite').value = '';
  document.getElementById('evtTimeStart').value = '';
  document.getElementById('evtTimeEnd').value = '';
  document.getElementById('btnDelete').style.display = 'none';
  refreshLevelBtns();
  buildCatSelect('gold');
  document.getElementById('eventModal').classList.add('open');
}

function openEditModal(id) {
  const e = events.find(x => x.id === id);
  if (!e) return;
  editingId = id;
  selectedLevel = e.level;
  document.getElementById('modalTitle').textContent = 'Editar Evento';
  document.getElementById('evtName').value = e.name;
  document.getElementById('evtStart').value = e.start;
  document.getElementById('evtEnd').value = e.end;
  document.getElementById('evtDesc').value = e.desc || '';
  document.getElementById('evtComite').value = e.comite || '';
  document.getElementById('evtTimeStart').value = e.timeStart || '';
  document.getElementById('evtTimeEnd').value = e.timeEnd || '';
  document.getElementById('btnDelete').style.display = '';
  refreshLevelBtns();
  buildCatSelect(e.cat);
  document.getElementById('eventModal').classList.add('open');
}

function selectLevel(l) {
  selectedLevel = l;
  refreshLevelBtns();
}

function refreshLevelBtns() {
  ['nacional','distrital','local'].forEach(l => {
    const b = document.getElementById('lvl-'+l);
    b.className = 'level-btn' + (selectedLevel === l ? ' sel-'+l : '');
  });
}

function closeModal() {
  document.getElementById('eventModal').classList.remove('open');
}

function handleOverlayClick(e) {
  if (e.target === e.currentTarget) closeModal();
}

function saveEvent() {
  const name = document.getElementById('evtName').value.trim();
  if (!name) { alert('El nombre del evento es obligatorio'); return; }
  const start = document.getElementById('evtStart').value;
  const end = document.getElementById('evtEnd').value || start;
  const desc = document.getElementById('evtDesc').value.trim();
  const cat = document.getElementById('evtCat').value;
  const comite = document.getElementById('evtComite').value;
  const timeStart = document.getElementById('evtTimeStart').value;
  const timeEnd = document.getElementById('evtTimeEnd').value;
  if (editingId !== null) {
    const e = events.find(x => x.id === editingId);
    if (e) { e.name=name; e.start=start; e.end=end; e.desc=desc; e.cat=cat; e.level=selectedLevel; e.comite=comite; e.timeStart=timeStart; e.timeEnd=timeEnd; saveEventToFirestore(e); }
  } else {
    const newId = nextId++;
    const newEvt = { id: newId, name, start, end, desc, cat, level: selectedLevel, comite, timeStart, timeEnd };
    events.push(newEvt);
    saveEventToFirestore(newEvt);
    saveConfigToFirestore();
  }
  closeModal();
  render();
  showToast('Evento guardado');
}

function deleteEvent() {
  if (editingId === null) return;
  if (!confirm('¿Eliminar este evento?')) return;
  const idToDelete = editingId;
  events = events.filter(x => x.id !== editingId);
  deleteEventFromFirestore(idToDelete);
  closeModal();
  render();
  showToast('Evento eliminado');
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ── CALENDAR VIEW ────────────────────────────────────────────────────────────
const CAL_DAY_NAMES = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];

function calChangeMonth(d) {
  calMonth += d;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
}

function renderCalendar() {
  const today = new Date();
  document.getElementById('calMonthTitle').innerHTML =
    MONTHS[calMonth] + ' <strong>' + calYear + '</strong>';

  // Day headers
  document.getElementById('calDayHeaders').innerHTML =
    CAL_DAY_NAMES.map((d,i) =>
      `<div class="cal-day-hdr ${i>=5?'weekend':''}">${d}</div>`
    ).join('');

  const firstDay = new Date(calYear, calMonth, 1);
  const lastDay = new Date(calYear, calMonth+1, 0);
  const startDow = (firstDay.getDay() + 6) % 7;

  let html = '';

  // Prev month padding
  const prevLast = new Date(calYear, calMonth, 0);
  for (let i = startDow-1; i >= 0; i--) {
    html += `<div class="cal-cell other-month"><div class="cal-num">${prevLast.getDate()-i}</div></div>`;
  }

  // Current month days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dow = (new Date(calYear, calMonth, d).getDay() + 6) % 7;
    const isWeekend = dow >= 5;
    const isToday = today.getFullYear()===calYear && today.getMonth()===calMonth && today.getDate()===d;
    const dateStr = calYear+'-'+String(calMonth+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    const dayEvts = events.filter(e => {
      const s = parseDate(e.start), en = parseDate(e.end);
      const t = parseDate(dateStr);
      return t >= s && t <= en;
    });
    const hasFree = dayEvts.length === 0;
    const dots = dayEvts.slice(0,4).map(e =>
      `<div class="cal-dot" style="background:${catColor(e.cat)}"></div>`
    ).join('');
    html += `<div class="cal-cell ${isWeekend?'weekend':''} ${isToday?'today':''} ${hasFree?'free':'has-events'}"
      onclick="openDayDetail('${dateStr}')">
      <div class="cal-num">${d}</div>
      ${dots ? `<div class="cal-dots">${dots}</div>` : '<div class="cal-free-badge"></div>'}
    </div>`;
  }

  // Next month fill
  const total = startDow + lastDay.getDate();
  const rem = (7 - (total % 7)) % 7;
  for (let d = 1; d <= rem; d++) {
    html += `<div class="cal-cell other-month"><div class="cal-num">${d}</div></div>`;
  }

  document.getElementById('calGrid').innerHTML = html;
}

// ── DAY DETAIL PANEL ─────────────────────────────────────────────────────────
function openDayDetail(dateStr) {
  selectedDayDate = dateStr;
  const [y,m,d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m-1, d);
  const dayNames = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  document.getElementById('dayDetailDate').textContent =
    dayNames[dt.getDay()] + ', ' + d + ' de ' + MONTHS[m-1] + ' de ' + y;

  const dayEvts = events.filter(e => {
    const s = parseDate(e.start), en = parseDate(e.end), t = parseDate(dateStr);
    return t >= s && t <= en;
  }).sort((a,b) => (a.timeStart||'').localeCompare(b.timeStart||''));

  if (dayEvts.length === 0) {
    document.getElementById('dayDetailEvents').innerHTML =
      '<div class="day-free-label">✅ Día libre — sin eventos</div>';
  } else {
    document.getElementById('dayDetailEvents').innerHTML = dayEvts.map(e => {
      const timeStr = e.timeStart ? (e.timeStart + (e.timeEnd ? '–'+e.timeEnd : '')+'h') : '';
      const sub = [timeStr, e.level, e.comite].filter(Boolean).join(' · ');
      const rowClick = isAdmin ? `onclick="openEditModal(${e.id}); closeDayDetail()"` : '';
      return `<div class="day-event-row" ${rowClick}>
        <div class="day-event-dot" style="background:${catColor(e.cat)}"></div>
        <div class="day-event-info">
          <div class="day-event-name">${e.name}</div>
          ${sub ? `<div class="day-event-sub">${sub}</div>` : ''}
        </div>
        ${isAdmin ? '<span style="color:var(--text-muted);font-size:0.8rem">›</span>' : ''}
      </div>`;
    }).join('');
  }

  const addBtn = document.getElementById('dayAddBtn');
  if (addBtn) addBtn.style.display = isAdmin ? 'block' : 'none';

  document.getElementById('dayDetailPanel').classList.add('open');
}

function closeDayDetail() {
  document.getElementById('dayDetailPanel').classList.remove('open');
}

function handleDayPanelClick(e) {
  if (e.target === e.currentTarget) closeDayDetail();
}

function addEventFromDay() {
  closeDayDetail();
  if (selectedDayDate) {
    editingId = null;
    selectedLevel = 'local';
    document.getElementById('modalTitle').textContent = 'Nuevo Evento';
    document.getElementById('evtName').value = '';
    document.getElementById('evtStart').value = selectedDayDate;
    document.getElementById('evtEnd').value = selectedDayDate;
    document.getElementById('evtDesc').value = '';
    document.getElementById('evtComite').value = '';
    document.getElementById('evtTimeStart').value = '';
    document.getElementById('evtTimeEnd').value = '';
    document.getElementById('btnDelete').style.display = 'none';
    refreshLevelBtns();
    buildCatSelect('gold');
    document.getElementById('eventModal').classList.add('open');
  }
}


// ── CATEGORY SELECT BUILDER ─────────────────────────────────────────────────
function buildCatSelect(selectedVal) {
  const sel = document.getElementById('evtCat');
  sel.innerHTML = CATEGORIES.map(c =>
    `<option value="${c.id}" ${c.id === selectedVal ? 'selected' : ''}>${c.label}</option>`
  ).join('');
}

// ── CATEGORY MANAGER ─────────────────────────────────────────────────────────
let catEdits = [];

function openCatManager() {
  catEdits = CATEGORIES.map(c => ({...c}));
  renderCatList();
  document.getElementById('catManagerModal').classList.add('open');
}

function closeCatManager() {
  document.getElementById('catManagerModal').classList.remove('open');
}

function handleCatOverlayClick(e) {
  if (e.target === e.currentTarget) closeCatManager();
}

function renderCatList() {
  const list = document.getElementById('catList');
  list.innerHTML = catEdits.map((c, i) => `
    <div class="cat-item">
      <div class="cat-swatch" style="background:${c.color}" title="Cambiar color">
      <input type="color" value="${c.color}" oninput="catEdits[${i}].color=this.value; this.parentElement.style.background=this.value" ${!isAdmin?'disabled':''}>
      </div>
      <input class="cat-item-label" type="text" value="${c.label}" oninput="catEdits[${i}].label=this.value" placeholder="Nombre categoría" ${!isAdmin?'readonly':''}/>
      ${isAdmin ? `<button class="cat-del-btn" onclick="deleteCatEdit(${i})" title="Eliminar">✕</button>` : ''}
    </div>
  `).join('');

  const actions = document.getElementById('catManagerActions');
  if (actions) {
    actions.innerHTML = `
      ${isAdmin ? '<button class="btn-add-cat" onclick="addNewCategory()">+ Nueva categoría</button>' : ''}
      <div class="modal-actions" style="margin-top:16px">
        <button class="btn-cancel" onclick="closeCatManager()">Cerrar</button>
        ${isAdmin ? '<button class="btn-save" onclick="saveCatManager()">Guardar</button>' : ''}
      </div>
    `;
  }
}

function deleteCatEdit(i) {
  if (catEdits.length <= 1) { alert('Debe haber al menos una categoría'); return; }
  catEdits.splice(i, 1);
  renderCatList();
}

function addNewCategory() {
  const colors = ['#c46060','#c8a96e','#4ab0d4','#6aab6a','#5a8ec8','#5aab9b','#d4845a','#9b7ec8','#c47a9b','#667080','#6b7280'];
  const color = colors[catEdits.length % colors.length];
  const newId = 'cat_' + Date.now();
  catEdits.push({ id: newId, label: 'Nueva categoría', color });
  renderCatList();
  setTimeout(() => {
    const inputs = document.querySelectorAll('.cat-item-label');
    const last = inputs[inputs.length-1];
    if (last) { last.focus(); last.select(); }
  }, 50);
}

async function saveCatManager() {
  if (catEdits.some(c => !c.label.trim())) {
    alert('Todas las categorías deben tener nombre'); return;
  }
  CATEGORIES = catEdits.map(c => ({...c, label: c.label.trim()}));
  await saveConfigToFirestore();
  buildCatSelect(document.getElementById('evtCat')?.value || CATEGORIES[0].id);
  closeCatManager();
  render();
}

// Inicio: cargar desde Firestore si está configurado, si no usar datos en memoria
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => loadFromFirestore());
} else {
  loadFromFirestore();
}
