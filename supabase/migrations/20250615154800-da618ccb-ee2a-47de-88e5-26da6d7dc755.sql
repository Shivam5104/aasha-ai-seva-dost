
-- Enable RLS and add user-restricted access for all major user data tables

-- APPOINTMENTS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user can view own appointments"
  ON public.appointments
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "user can insert appointments with own user_id"
  ON public.appointments
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "user can update own appointments"
  ON public.appointments
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "user can delete own appointments"
  ON public.appointments
  FOR DELETE
  USING (user_id = auth.uid());

-- ORDERS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user can view own orders"
  ON public.orders
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "user can insert orders with own user_id"
  ON public.orders
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "user can update own orders"
  ON public.orders
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "user can delete own orders"
  ON public.orders
  FOR DELETE
  USING (user_id = auth.uid());

-- PROFILES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user can select own profile only"
  ON public.profiles
  FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "user can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (id = auth.uid());

CREATE POLICY "user can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "user can delete own profile"
  ON public.profiles
  FOR DELETE
  USING (id = auth.uid());
