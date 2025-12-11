import { supabase } from '../config/supabase.js';

export const createBookSet = async (req, res) => {
  try {
    const { board_id, medium_id, class_id, year_id, set_name, books } = req.body;

    const { data: bookSet, error: setError } = await supabase
      .from('book_sets')
      .insert([{ board_id, medium_id, class_id, year_id, set_name }])
      .select()
      .single();

    if (setError) {
      return res.status(400).json({ error: setError.message });
    }

    const bookSetItems = books.map(book => ({
      book_set_id: bookSet.id,
      book_id: book.book_id,
      quantity: book.quantity || 1
    }));

    const { error: itemsError } = await supabase
      .from('book_set_items')
      .insert(bookSetItems);

    if (itemsError) {
      await supabase.from('book_sets').delete().eq('id', bookSet.id);
      return res.status(400).json({ error: itemsError.message });
    }

    const { data: fullBookSet } = await supabase
      .from('book_sets')
      .select(`
        *,
        boards(board_name),
        mediums(medium_name),
        classes(class_name),
        academic_years(year_name),
        book_set_items(quantity, books(*))
      `)
      .eq('id', bookSet.id)
      .single();

    res.status(201).json({ message: 'Book set created successfully', data: fullBookSet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookSets = async (req, res) => {
  try {
    const { board_id, medium_id, class_id, year_id } = req.query;

    let query = supabase
      .from('book_sets')
      .select(`
        *,
        boards(board_name),
        mediums(medium_name),
        classes(class_name),
        academic_years(year_name),
        book_set_items(quantity, books(*))
      `);

    if (board_id) query = query.eq('board_id', board_id);
    if (medium_id) query = query.eq('medium_id', medium_id);
    if (class_id) query = query.eq('class_id', class_id);
    if (year_id) query = query.eq('year_id', year_id);

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookSetById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('book_sets')
      .select(`
        *,
        boards(board_name),
        mediums(medium_name),
        classes(class_name),
        academic_years(year_name),
        book_set_items(quantity, books(*))
      `)
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Book set not found' });
    }

    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookSet = async (req, res) => {
  try {
    const { id } = req.params;
    const { board_id, medium_id, class_id, year_id, set_name, books } = req.body;

    const updateData = {};
    if (board_id) updateData.board_id = board_id;
    if (medium_id) updateData.medium_id = medium_id;
    if (class_id) updateData.class_id = class_id;
    if (year_id) updateData.year_id = year_id;
    if (set_name) updateData.set_name = set_name;

    if (Object.keys(updateData).length > 0) {
      const { error: setError } = await supabase
        .from('book_sets')
        .update(updateData)
        .eq('id', id);

      if (setError) {
        return res.status(400).json({ error: setError.message });
      }
    }

    if (books && books.length > 0) {
      await supabase.from('book_set_items').delete().eq('book_set_id', id);

      const bookSetItems = books.map(book => ({
        book_set_id: parseInt(id),
        book_id: book.book_id,
        quantity: book.quantity || 1
      }));

      const { error: itemsError } = await supabase
        .from('book_set_items')
        .insert(bookSetItems);

      if (itemsError) {
        return res.status(400).json({ error: itemsError.message });
      }
    }

    const { data: updatedBookSet } = await supabase
      .from('book_sets')
      .select(`
        *,
        boards(board_name),
        mediums(medium_name),
        classes(class_name),
        academic_years(year_name),
        book_set_items(quantity, books(*))
      `)
      .eq('id', id)
      .single();

    res.json({ message: 'Book set updated successfully', data: updatedBookSet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBookSet = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('book_sets')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Book set deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
