
-- Create chat threads table
CREATE TABLE public.chat_threads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID REFERENCES public.chat_threads(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_user BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_threads
CREATE POLICY "Users can view their own threads" 
  ON public.chat_threads 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own threads" 
  ON public.chat_threads 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own threads" 
  ON public.chat_threads 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own threads" 
  ON public.chat_threads 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can view messages from their threads" 
  ON public.chat_messages 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_threads 
      WHERE chat_threads.id = chat_messages.thread_id 
      AND chat_threads.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their threads" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chat_threads 
      WHERE chat_threads.id = chat_messages.thread_id 
      AND chat_threads.user_id = auth.uid()
    )
  );

-- Create function to update thread updated_at timestamp
CREATE OR REPLACE FUNCTION update_thread_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.chat_threads 
    SET updated_at = now() 
    WHERE id = NEW.thread_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update thread timestamp when new message is added
CREATE TRIGGER update_thread_on_message
    AFTER INSERT ON public.chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_thread_timestamp();
