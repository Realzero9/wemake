ALTER TABLE public.gpt_ideas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.gpt_ideas FOR SELECT USING (true);