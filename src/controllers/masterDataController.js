import { supabase } from '../config/supabase.js';

export const getBoards = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .order('board_name');

    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMediums = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mediums')
      .select('*')
      .order('medium_name');

    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClasses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('class_order');

    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAcademicYears = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('academic_years')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('book_name');

    if (error) throw error;
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMasterData = (tableName) => async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json({ data: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMasterData = (tableName) => async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from(tableName)
      .update(req.body)
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ data: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMasterData = (tableName) => async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
