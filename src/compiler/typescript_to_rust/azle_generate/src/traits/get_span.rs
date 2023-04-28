use swc_common::Span;

pub trait GetSpan {
    fn get_span(&self) -> Span;
}
